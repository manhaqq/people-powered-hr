import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, CalendarCheck, UserPlus, TrendingUp, ArrowUpRight } from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { workforceTrend, leaveRequests, candidates, employees } from "@/lib/hr-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Northwind HR" },
      { name: "description", content: "Live overview of headcount, approvals, payroll and hiring." },
    ],
  }),
  component: Dashboard,
});

function Stat({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  delta?: string;
  icon: typeof Users;
  tone?: "primary" | "success" | "warning" | "accent";
}) {
  const toneMap = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    accent: "bg-accent text-accent-foreground",
  } as const;
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
            {delta && (
              <div className="mt-2 inline-flex items-center gap-1 text-xs text-success">
                <ArrowUpRight className="h-3.5 w-3.5" />
                {delta}
              </div>
            )}
          </div>
          <div className={`h-10 w-10 rounded-xl grid place-items-center ${toneMap[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const pending = leaveRequests.filter((l) => l.status === "Pending");
  const newHires = employees.slice(0, 4);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Good morning, Sofia</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Here's what's happening across your people today, Saturday 27 June.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Total headcount" value="142" delta="+6 this month" icon={Users} tone="primary" />
          <Stat label="Pending approvals" value={String(pending.length)} delta="3 leave, 1 expense" icon={CalendarCheck} tone="warning" />
          <Stat label="Next payroll" value="Jun 30" delta="142 employees" icon={Clock} tone="accent" />
          <Stat label="Open roles" value="9" delta="23 active candidates" icon={UserPlus} tone="success" />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Workforce trend</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Headcount over the last 6 months</p>
              </div>
              <Badge variant="secondary" className="gap-1">
                <TrendingUp className="h-3 w-3" /> +20.3%
              </Badge>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={workforceTrend} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="oklch(0.62 0.16 240)" />
                      <stop offset="100%" stopColor="oklch(0.55 0.18 295)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(0.92 0.01 256)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="oklch(0.55 0.03 257)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.55 0.03 257)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid oklch(0.92 0.01 256)",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="headcount"
                    stroke="url(#lg1)"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pending approvals</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Action needed from you</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {pending.slice(0, 4).map((r) => (
                <div key={r.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 hover:bg-muted/40 transition-colors">
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{r.employee}</div>
                    <div className="text-xs text-muted-foreground">{r.type} · {r.days}d · {r.from}</div>
                  </div>
                  <Badge variant="outline" className="border-warning/40 text-warning-foreground bg-warning/10">{r.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">New hires this quarter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {newHires.map((e) => (
                <div key={e.id} className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-accent text-accent-foreground grid place-items-center text-xs font-semibold">{e.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{e.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{e.role} · {e.department}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{e.joined}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pipeline highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {candidates.slice(0, 4).map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{c.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{c.role} · {c.source}</div>
                  </div>
                  <Badge variant="secondary">{c.stage}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
