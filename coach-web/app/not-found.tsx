import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-gray-400 mb-4">The page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 inline-block"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

