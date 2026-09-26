import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6">
        
        {/* Left Section */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={21} />
          </button>

          {/* Page Title */}
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">
              Career Dashboard
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Search */}
          <div className="relative hidden md:block">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="search"
              placeholder="Search..."
              aria-label="Search"
              className="
                h-9
                w-48
                rounded-lg
                border
                border-zinc-800
                bg-zinc-900
                pl-9
                pr-3
                text-sm
                text-white
                placeholder:text-zinc-600
                outline-none
                transition
                focus:border-zinc-600
                lg:w-64
              "
            />
          </div>

          {/* Notification */}
          <button
            type="button"
            className="relative rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
            aria-label="Notifications"
          >
            <Bell size={19} />

            {/* Notification indicator */}
            <span
              className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-white"
              aria-hidden="true"
            />
          </button>

          {/* User */}
          <div className="flex items-center gap-2 border-l border-zinc-800 pl-3 sm:gap-3 sm:pl-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-white">
              U
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">
                User
              </p>

              <p className="text-xs text-zinc-500">
                Career Explorer
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;