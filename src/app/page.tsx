import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const customers = await prisma.customer.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query } },
            { phone: { contains: query } },
            { email: { contains: query } },
            { company: { contains: query } },
            { tags: { contains: query } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            고객 관리
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            총 {customers.length}명의 고객
          </p>
        </div>
        <Link
          href="/customers/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          + 고객 등록
        </Link>
      </div>

      <form method="get" className="flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="이름, 전화번호, 이메일, 회사, 태그로 검색"
          className="w-full max-w-md rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <button
          type="submit"
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          검색
        </button>
        {query && (
          <Link
            href="/"
            className="rounded-md px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            초기화
          </Link>
        )}
      </form>

      {customers.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 py-20 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          <p>{query ? "검색 결과가 없습니다." : "등록된 고객이 없습니다."}</p>
          {!query && (
            <Link href="/customers/new" className="text-sm font-medium underline">
              첫 고객을 등록해보세요
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">이름</th>
                <th className="px-4 py-3 font-medium">전화번호</th>
                <th className="px-4 py-3 font-medium">회사</th>
                <th className="px-4 py-3 font-medium">태그</th>
                <th className="px-4 py-3 font-medium">등록일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                    <Link href={`/customers/${customer.id}`} className="block">
                      {customer.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    <Link href={`/customers/${customer.id}`} className="block">
                      {customer.phone || "-"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    <Link href={`/customers/${customer.id}`} className="block">
                      {customer.company || "-"}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/customers/${customer.id}`} className="flex flex-wrap gap-1">
                      {customer.tags
                        ? customer.tags.split(",").map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                            >
                              {tag.trim()}
                            </span>
                          ))
                        : "-"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                    <Link href={`/customers/${customer.id}`} className="block">
                      {customer.createdAt.toLocaleDateString("ko-KR")}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
