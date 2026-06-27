import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarCheck,
  Wallet,
  UserPlus,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav: Array<{ to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }> = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/employees", label: "Employees", icon: Users },
  { to: "/attendance", label: "Attendance", icon: Clock },
  { to: "/leave", label: "Leave", icon: CalendarCheck },
  { to: "/payroll", label: "Payroll", icon: Wallet },
  { to: "/recruitment", label: "Recruitment", icon: UserPlus },
  { to: "/reports", label: "Reports", icon: BarChart3 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
  const active = nav.find((n) => isActive(n.to, n.exact));

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-lg bg-sidebar-primary grid place-items-center text-sidebar-primary-foreground font-semibold">N</div>
          <div>
            <div className="text-sm font-semibold leading-tight">Northwind HR</div>
            <div className="text-[11px] text-sidebar-foreground/60">People Platform</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const a = isActive(item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  a
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <div className="mt-3 flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full bg-sidebar-accent grid place-items-center text-xs font-semibold">SA</div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">Sofia Alvarez</div>
              <div className="text-[11px] text-sidebar-foreground/60 truncate">HR Admin</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card/60 backdrop-blur flex items-center justify-between px-6">
          <div>
            <div className="text-xs text-muted-foreground">{active?.label === "Dashboard" ? "Overview" : "Module"}</div>
            <h1 className="text-base font-semibold leading-tight">{active?.label ?? "HR"}</h1>
          </div>
          <div className="flex items-center gap-3">
            <input
              placeholder="Search people, requests, reports…"
              className="hidden md:block w-80 h-9 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
            <button className="h-9 px-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
              + New
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
