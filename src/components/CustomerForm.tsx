type CustomerFormValues = {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  company?: string | null;
  address?: string | null;
  memo?: string | null;
  tags?: string | null;
};

export default function CustomerForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: CustomerFormValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="이름" name="name" required defaultValue={defaultValues?.name} />
        <Field label="전화번호" name="phone" defaultValue={defaultValues?.phone} />
        <Field label="이메일" name="email" type="email" defaultValue={defaultValues?.email} />
        <Field label="회사" name="company" defaultValue={defaultValues?.company} />
        <Field label="주소" name="address" defaultValue={defaultValues?.address} className="sm:col-span-2" />
        <Field
          label="태그 (쉼표로 구분)"
          name="tags"
          defaultValue={defaultValues?.tags}
          placeholder="예: VIP, 신규"
          className="sm:col-span-2"
        />
      </div>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">메모</span>
        <textarea
          name="memo"
          rows={4}
          defaultValue={defaultValues?.memo ?? ""}
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </label>
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | null;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1 text-sm ${className ?? ""}`}>
      <span className="font-medium text-zinc-700 dark:text-zinc-300">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      />
    </label>
  );
}
