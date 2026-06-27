import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Megaphone, Search, Pin, Heart, MessageSquare, Calendar } from "lucide-react";
import { newsItems, type NewsItem } from "@/lib/hr-data";
import { useState } from "react";

export const Route = createFileRoute("/news")({
  head: () => ({ meta: [{ title: "News — Northwind HR" }] }),
  component: NewsPage,
});

const categoryTone: Record<NewsItem["category"], string> = {
  Company: "bg-primary/10 text-primary border-primary/30",
  Policy: "bg-warning/15 text-warning-foreground border-warning/30",
  People: "bg-accent text-accent-foreground border-accent",
  Events: "bg-secondary text-secondary-foreground border-secondary",
  Celebrations: "bg-success/10 text-success border-success/30",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function NewsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const pinned = newsItems.filter((n) => n.pinned);
  const filtered = newsItems.filter((n) => {
    const matchesCategory = activeCategory === "All" || n.category === activeCategory;
    const matchesSearch =
      query.trim() === "" ||
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.content.toLowerCase().includes(query.toLowerCase()) ||
      n.author.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const unpinned = filtered.filter((n) => !n.pinned);
  const shownItems = activeCategory === "All" && query.trim() === "" ? [...pinned, ...unpinned] : filtered;

  return (
    <AppShell>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Announcements</h2>
            <p className="text-sm text-muted-foreground">Company news, policy updates, and celebrations</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements…"
                className="pl-9 w-64"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button size="sm" className="gap-2">
              <Megaphone className="h-4 w-4" /> Post
            </Button>
          </div>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList>
            {["All", "Company", "Policy", "People", "Events", "Celebrations"].map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid gap-4">
          {shownItems.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center text-sm text-muted-foreground">
                No announcements match your search.
              </CardContent>
            </Card>
          )}

          {shownItems.map((item) => (
            <Card key={item.id} className={item.pinned ? "border-primary/30" : ""}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                    {item.pinned ? <Pin className="h-5 w-5" /> : <Megaphone className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={categoryTone[item.category]}>
                        {item.category}
                      </Badge>
                      {item.pinned && (
                        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                          Pinned
                        </Badge>
                      )}
                    </div>
                    <h3 className="mt-2 text-base font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded-full bg-secondary text-secondary-foreground grid place-items-center text-[10px] font-semibold">
                          {item.author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-medium text-foreground">{item.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(item.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5" />
                        {item.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        {item.comments}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
