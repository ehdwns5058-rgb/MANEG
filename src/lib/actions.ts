"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function readCustomerFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const memo = String(formData.get("memo") ?? "").trim();
  const tags = String(formData.get("tags") ?? "").trim();

  if (!name) {
    throw new Error("이름은 필수입니다.");
  }

  return {
    name,
    phone: phone || null,
    email: email || null,
    company: company || null,
    address: address || null,
    memo: memo || null,
    tags: tags || null,
  };
}

export async function createCustomer(formData: FormData) {
  const data = readCustomerFields(formData);
  await prisma.customer.create({ data });
  revalidatePath("/");
  redirect("/");
}

export async function updateCustomer(id: string, formData: FormData) {
  const data = readCustomerFields(formData);
  await prisma.customer.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath(`/customers/${id}`);
  redirect(`/customers/${id}`);
}

export async function deleteCustomer(id: string) {
  await prisma.customer.delete({ where: { id } });
  revalidatePath("/");
  redirect("/");
}
