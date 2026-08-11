"use client";

export default function Typing() {

  return (

    <div className="flex justify-start">

      <div className="rounded-3xl bg-white px-6 py-4 shadow">

        <div className="flex gap-2">

          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600" />

          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600 delay-150" />

          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600 delay-300" />

        </div>

      </div>

    </div>

  );

}