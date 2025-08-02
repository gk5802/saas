export default function Input({
  label,
  type = "text",
  value,
  onChange,
  toggle,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
        />
        {toggle && (
          <span
            onClick={toggle}
            className="absolute right-2 top-2 cursor-pointer text-xs text-blue-500"
          >
            {type === "password" ? "Show" : "Hide"}
          </span>
        )}
      </div>
    </div>
  );
}
