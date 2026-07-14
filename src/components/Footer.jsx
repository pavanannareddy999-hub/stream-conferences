export default function Footer() {
  return (
    <footer className="px-6 md:px-16 py-8 text-center font-mono text-xs text-[#86988F] border-t border-white/10">
      © {new Date().getFullYear()} Stream Conferences. hello@stream-conferences.example
    </footer>
  );
}
