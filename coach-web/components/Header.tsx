'use client';

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-white relative">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">JD</span>
          </div>
          <button className="p-2 text-gray-400 hover:text-white">
            <span className="text-xl">⚙️</span>
          </button>
        </div>
      </div>
    </header>
  );
}

