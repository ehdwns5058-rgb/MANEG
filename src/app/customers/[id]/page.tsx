import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeleteCustomerButton from "@/components/DeleteCustomerButton";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await prisma.customer.findUnique({ where: { id } });

  if (!customer) {
    notFound();
  }

  const tags = customer.tags
    ? customer.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-10">
      <div>
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
          ← 목록으로
        </Link>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {customer.name}
          </h1>
          <div className="flex gap-2">
            <Link
              href={`/customers/${customer.id}/edit`}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              수정
            </Link>
            <DeleteCustomerButton id={customer.id} name={customer.name} />
          </div>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <dl className="grid grid-cols-1 gap-4 rounded-lg border border-zinc-200 p-5 text-sm sm:grid-cols-2 dark:border-zinc-800">
        <Info label="전화번호" value={customer.phone} />
        <Info label="이메일" value={customer.email} />
        <Info label="회사" value={customer.company} />
        <Info label="등록일" value={customer.createdAt.toLocaleString("ko-KR")} />
        <Info label="주소" value={customer.address} className="sm:col-span-2" />
        <div className="sm:col-span-2">
          <dt className="font-medium text-zinc-500 dark:text-zinc-400">메모</dt>
          <dd className="mt-1 whitespace-pre-wrap text-zinc-900 dark:text-zinc-100">
            {customer.memo || "-"}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function Info({
  label,
  value,
  className,
}: {
  label: string;
  value?: string | null;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="font-medium text-zinc-500 dark:text-zinc-400">{label}</dt>
      <dd className="mt-1 text-zinc-900 dark:text-zinc-100">{value || "-"}</dd>
    </div>
  );
}
