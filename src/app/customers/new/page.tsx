import Link from "next/link";
import { createCustomer } from "@/lib/actions";
import CustomerForm from "@/components/CustomerForm";

export default function NewCustomerPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-10">
      <div>
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
          ← 목록으로
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          고객 등록
        </h1>
      </div>
      <CustomerForm action={createCustomer} submitLabel="등록" />
    </div>
  );
}
