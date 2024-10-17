import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export default function InvestmentStrategy() {
  const strategies = [
    "Aggresive",
    "Moderat",
    "Konservatif",
    "Sangat Konservatif",
  ];

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">
          Rekomendasi Strategi
        </CardTitle>
        <TrendingUp className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {strategies.map((strategy, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              {strategy}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
