import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { attendance } from "@/lib/hr-data";
import { Clock, LogIn, LogOut } from "lucide-react";

export const Route = createFileRoute("/attendance")({
  head: () => ({ meta: [{ title: "Attendance — Northwind HR" }] }),
  component: AttendancePage,
});

function tone(s: string) {
  if (s === "Present") return "bg-success/10 text-success border-success/30";
  if (s === "Late") return "bg-warning/15 text-warning-foreground border-warning/30";
  return "bg-muted text-muted-foreground border-border";
}

function AttendancePage() {
  const present = attendance.filter((a) => a.status === "Present").length;
  const late = attendance.filter((a) => a.status === "Late").length;
  const off = attendance.filter((a) => a.status === "On Leave").length;
  return (
    <AppShell>
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { l: "Present today", v: present, t: "success" },
            { l: "Late", v: late, t: "warning" },
            { l: "On leave", v: off, t: "muted" },
            { l: "Avg hours", v: "8.4h", t: "primary" },
          ].map((s) => (
            <Card key={s.l}>
              <CardContent className="p-5">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.l}</div>
                <div className="mt-2 text-3xl font-semibold tracking-tight">{s.v}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Today · Live attendance</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Last synced 2 minutes ago</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2"><LogIn className="h-4 w-4" /> Clock in</Button>
              <Button size="sm" className="gap-2"><LogOut className="h-4 w-4" /> Clock out</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
                    <th className="px-5 py-3 font-medium">Employee</th>
                    <th className="px-5 py-3 font-medium">Clock in</th>
                    <th className="px-5 py-3 font-medium">Clock out</th>
                    <th className="px-5 py-3 font-medium">Hours</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((a) => (
                    <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                      <td className="px-5 py-3 font-medium">{a.name}</td>
                      <td className="px-5 py-3 text-muted-foreground"><Clock className="inline h-3.5 w-3.5 mr-1.5" />{a.clockIn}</td>
                      <td className="px-5 py-3 text-muted-foreground">{a.clockOut}</td>
                      <td className="px-5 py-3">{a.hours}h</td>
                      <td className="px-5 py-3"><Badge variant="outline" className={tone(a.status)}>{a.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
