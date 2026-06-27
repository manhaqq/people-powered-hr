import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { candidates } from "@/lib/hr-data";

export const Route = createFileRoute("/recruitment")({
  head: () => ({ meta: [{ title: "Recruitment — Northwind HR" }] }),
  component: RecruitmentPage,
});

const stages = ["Applied", "Screening", "Interview", "Offer"] as const;

function RecruitmentPage() {
  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Pipeline</h2>
          <p className="text-sm text-muted-foreground">9 open roles · {candidates.length} active candidates</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage) => {
            const items = candidates.filter((c) => c.stage === stage);
            return (
              <Card key={stage} className="bg-muted/30 border-dashed">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    {stage}
                    <Badge variant="secondary">{items.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {items.map((c) => (
                    <div key={c.id} className="rounded-lg bg-card border border-border p-3 shadow-sm">
                      <div className="text-sm font-medium">{c.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{c.role}</div>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{c.source}</span>
                        <span>{c.applied}</span>
                      </div>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="text-xs text-muted-foreground text-center py-6">No candidates</div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
