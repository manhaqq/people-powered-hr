import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { departments, workforceTrend } from "@/lib/hr-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from "recharts";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — Northwind HR" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Reports</h2>
          <p className="text-sm text-muted-foreground">Workforce insights, ready to export</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Headcount by department</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departments} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                  <CartesianGrid stroke="oklch(0.92 0.01 256)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="oklch(0.55 0.03 257)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.55 0.03 257)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 256)", fontSize: 12 }} />
                  <Bar dataKey="count" fill="oklch(0.62 0.16 240)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Workforce growth</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={workforceTrend} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                  <CartesianGrid stroke="oklch(0.92 0.01 256)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="oklch(0.55 0.03 257)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.55 0.03 257)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 256)", fontSize: 12 }} />
                  <Line type="monotone" dataKey="headcount" stroke="oklch(0.62 0.16 240)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: "white" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { l: "Attrition (YTD)", v: "4.2%", s: "Below industry avg" },
            { l: "Avg tenure", v: "3.1 yrs", s: "+0.4 vs last yr" },
            { l: "Offer acceptance", v: "87%", s: "Last quarter" },
          ].map((c) => (
            <Card key={c.l}>
              <CardContent className="p-5">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{c.l}</div>
                <div className="mt-2 text-3xl font-semibold tracking-tight">{c.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.s}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
