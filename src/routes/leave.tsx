import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { leaveRequests } from "@/lib/hr-data";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/leave")({
  head: () => ({ meta: [{ title: "Leave — Northwind HR" }] }),
  component: LeavePage,
});

function tone(s: string) {
  if (s === "Approved") return "bg-success/10 text-success border-success/30";
  if (s === "Pending") return "bg-warning/15 text-warning-foreground border-warning/30";
  return "bg-destructive/10 text-destructive border-destructive/30";
}

function LeavePage() {
  return (
    <AppShell>
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { l: "Annual leave used", v: "62%", s: "Across the org" },
            { l: "Avg balance left", v: "11.4d", s: "Per employee" },
            { l: "Approvals pending", v: leaveRequests.filter(r => r.status === "Pending").length, s: "Awaiting action" },
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

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leave requests</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Approve or reject in a single click</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
                    <th className="px-5 py-3 font-medium">Request</th>
                    <th className="px-5 py-3 font-medium">Employee</th>
                    <th className="px-5 py-3 font-medium">Type</th>
                    <th className="px-5 py-3 font-medium">Dates</th>
                    <th className="px-5 py-3 font-medium">Days</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((r) => (
                    <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                      <td className="px-5 py-3 font-medium">{r.employee}</td>
                      <td className="px-5 py-3 text-muted-foreground">{r.type}</td>
                      <td className="px-5 py-3 text-muted-foreground">{r.from} → {r.to}</td>
                      <td className="px-5 py-3">{r.days}</td>
                      <td className="px-5 py-3"><Badge variant="outline" className={tone(r.status)}>{r.status}</Badge></td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0" disabled={r.status !== "Pending"}><Check className="h-4 w-4 text-success" /></Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0" disabled={r.status !== "Pending"}><X className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      </td>
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
