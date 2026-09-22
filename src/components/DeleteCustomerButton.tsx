"use client";

import { useTransition } from "react";
import { deleteCustomer } from "@/lib/actions";

export default function DeleteCustomerButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm(`'${name}' 고객 정보를 삭제하시겠습니까?`)) {
          startTransition(() => {
            deleteCustomer(id);
          });
        }
      }}
      className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
    >
      {isPending ? "삭제 중..." : "삭제"}
    </button>
  );
}
