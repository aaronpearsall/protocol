export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
        <a
          href="/"
          className="px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 inline-block"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}

