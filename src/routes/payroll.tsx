import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { payroll } from "@/lib/hr-data";
import { Download, Play } from "lucide-react";

export const Route = createFileRoute("/payroll")({
  head: () => ({ meta: [{ title: "Payroll — Northwind HR" }] }),
  component: PayrollPage,
});

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

function PayrollPage() {
  const gross = payroll.reduce((s, p) => s + p.gross, 0);
  const ded = payroll.reduce((s, p) => s + p.deductions, 0);
  const net = payroll.reduce((s, p) => s + p.net, 0);
  return (
    <AppShell>
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { l: "Cycle", v: "Jun 2026" },
            { l: "Gross", v: fmt(gross) },
            { l: "Deductions", v: fmt(ded) },
            { l: "Net payout", v: fmt(net) },
          ].map((c) => (
            <Card key={c.l}>
              <CardContent className="p-5">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{c.l}</div>
                <div className="mt-2 text-3xl font-semibold tracking-tight">{c.v}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">June 2026 payroll run</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Auto-calculated salaries, deductions and tax</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
              <Button size="sm" className="gap-2"><Play className="h-4 w-4" /> Run payroll</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
                    <th className="px-5 py-3 font-medium">Employee</th>
                    <th className="px-5 py-3 font-medium">Role</th>
                    <th className="px-5 py-3 font-medium text-right">Gross</th>
                    <th className="px-5 py-3 font-medium text-right">Deductions</th>
                    <th className="px-5 py-3 font-medium text-right">Net</th>
                  </tr>
                </thead>
                <tbody>
                  {payroll.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                      <td className="px-5 py-3 font-medium">{p.name}</td>
                      <td className="px-5 py-3 text-muted-foreground">{p.role}</td>
                      <td className="px-5 py-3 text-right tabular-nums">{fmt(p.gross)}</td>
                      <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">−{fmt(p.deductions)}</td>
                      <td className="px-5 py-3 text-right tabular-nums font-semibold">{fmt(p.net)}</td>
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
