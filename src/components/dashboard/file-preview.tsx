"use client";

interface Props {
  file: File;
}

export default function FilePreview({
  file,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="font-semibold">
        {file.name}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {(file.size / 1024).toFixed(2)} KB
      </p>

      <button className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">
        Analyze with Aura AI
      </button>
    </div>
  );
}