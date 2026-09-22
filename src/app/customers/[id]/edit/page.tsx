import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateCustomer } from "@/lib/actions";
import CustomerForm from "@/components/CustomerForm";

export default async function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await prisma.customer.findUnique({ where: { id } });

  if (!customer) {
    notFound();
  }

  const updateCustomerWithId = updateCustomer.bind(null, customer.id);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-10">
      <div>
        <Link
          href={`/customers/${customer.id}`}
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          ← 상세 정보로
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          고객 정보 수정
        </h1>
      </div>
      <CustomerForm action={updateCustomerWithId} defaultValues={customer} submitLabel="저장" />
    </div>
  );
}
