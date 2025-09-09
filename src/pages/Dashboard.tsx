import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";

const statsCards = [
  {
    title: "Total Produits",
    value: "1,247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Package,
  },
  {
    title: "Commandes du mois",
    value: "342",
    change: "+8%",
    changeType: "positive" as const,
    icon: ShoppingCart,
  },
  {
    title: "Clients actifs",
    value: "2,891",
    change: "+15%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Chiffre d'affaires",
    value: "€45,820",
    change: "+23%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Vue d'ensemble de votre parapharmacie
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-success mt-1">
                <span className="font-medium">{stat.change}</span> vs mois dernier
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "ORD-001", customer: "Marie Dubois", amount: "€74.97", status: "En cours" },
                { id: "ORD-002", customer: "Jean Martin", amount: "€41.97", status: "Expédiée" },
                { id: "ORD-003", customer: "Sophie Leroy", amount: "€54.98", status: "Livrée" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{order.amount}</p>
                    <p className="text-sm text-primary">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Produits populaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Crème Anti-âge Yeux", sales: 142, stock: 150 },
                { name: "Rouge à Lèvres Hydratant", sales: 89, stock: 85 },
                { name: "Crème Hydratante Jour", sales: 67, stock: 200 },
              ].map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} vendus</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}