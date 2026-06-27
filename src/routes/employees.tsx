import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Filter } from "lucide-react";
import { employees } from "@/lib/hr-data";

export const Route = createFileRoute("/employees")({
  head: () => ({ meta: [{ title: "Employees — Northwind HR" }] }),
  component: EmployeesPage,
});

function statusTone(s: string) {
  if (s === "Active") return "bg-success/10 text-success border-success/30";
  if (s === "On Leave") return "bg-warning/15 text-warning-foreground border-warning/30";
  return "bg-accent text-accent-foreground border-accent";
}

function EmployeesPage() {
  return (
    <AppShell>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Directory</h2>
            <p className="text-sm text-muted-foreground">{employees.length} people across 7 departments</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, role…" className="pl-9 w-72" />
            </div>
            <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filter</Button>
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
                    <th className="px-5 py-3 font-medium">Employee</th>
                    <th className="px-5 py-3 font-medium">Role</th>
                    <th className="px-5 py-3 font-medium">Department</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((e) => (
                    <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-accent text-accent-foreground grid place-items-center text-xs font-semibold">{e.avatar}</div>
                          <div>
                            <div className="font-medium">{e.name}</div>
                            <div className="text-xs text-muted-foreground">{e.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">{e.role}</td>
                      <td className="px-5 py-3 text-muted-foreground">{e.department}</td>
                      <td className="px-5 py-3"><Badge variant="outline" className={statusTone(e.status)}>{e.status}</Badge></td>
                      <td className="px-5 py-3 text-muted-foreground">{e.joined}</td>
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
