export default function Footer() {
  return (
    <footer className="w-full bg-white border-t py-4">
      <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TinyLink — All rights reserved.
      </div>
    </footer>
  );
}
