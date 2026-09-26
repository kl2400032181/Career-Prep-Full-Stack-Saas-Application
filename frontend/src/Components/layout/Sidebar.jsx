import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  MessageSquare,
  FileText,
  History,
  Users,
  LogOut,
  X,
  BriefcaseBusiness,
} from "lucide-react";
import toast from "react-hot-toast";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    name: "AI Interview",
    path: "/interview",
    icon: MessageSquare,
  },
  {
    name: "Resume Analysis",
    path: "/resume-analysis",
    icon: FileText,
  },
  {
    name: "Interview History",
    path: "/history",
    icon: History,
  },
  {
    name: "Connections",
    path: "/connections",
    icon: Users,
  },
];

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully.");

    onClose?.();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          border-r border-zinc-800 bg-zinc-950
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo / Brand */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-zinc-800 px-5">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Career Prep AI
            </h1>

            <p className="mt-0.5 text-xs text-zinc-500">
              AI Career Intelligence
            </p>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-900 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-zinc-600">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-white text-black"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.3 : 2}
                      />

                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="shrink-0 border-t border-zinc-800 p-3">
          {/* Career Prep Info */}
          <div className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black">
                <BriefcaseBusiness size={17} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  Career Explorer
                </p>

                <p className="truncate text-xs text-zinc-500">
                  Build your future
                </p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;