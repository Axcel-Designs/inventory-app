export default function LoadingSec() {
  return (
    <main className="min-h-screen bg-[#faf5ee] flex flex-col items-center justify-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#d8d0c8] border-t-[#c2652a]"></div>
      <p className="text-sm font-medium text-[#605850]">Loading...</p>
    </main>
  );
}
