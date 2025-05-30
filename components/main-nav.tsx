import Link from "next/link"

export function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/application-settings"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Application Settings
      </Link>
      {/* ... existing nav items ... */}
    </nav>
  )
} 