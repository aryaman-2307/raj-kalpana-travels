export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-[#E2E8F0]" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[#E53935] animate-spin" />
        </div>
        <p className="text-[#64748B] text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
