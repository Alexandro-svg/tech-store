import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
};

async function getProducts(): Promise<Product[]> {
    const res = await fetch("http://backend:8000/api/products/", { cache: "no-store" });
    if (!res.ok) {
        console.log("API ERROR");
        return [];
    }

    return res.json();
}

export const CarouselNewProducts = () => {
    return (
async function Home() {
  const products = await getProducts();
    <div className="min-h-screen flex flex-col">

      {/* 🔥 PRODUCTS */}
      <section className="p-10">
        <h1 className="text-3xl mb-5">Products</h1>

        <div className="flex justify-start gap-5">
          {products.map((p) => (
            <a href="/" className="relative w-full max-w-60">
              <Card className="w-full pt-0 hover:border">
                <div className="absolute inset-0 z-30" />
                <img
                  src={
                    p.image.startsWith("http")
                      ? p.image // Если это полная ссылка на сторонний ресурс
                      : `http://localhost:8000${p.image}` // Если это путь от Django (например /media/...)
                  }
                  alt={p.name}
                  className="relative z-20 w-full object-cover"
                />
                <CardHeader>
                  {/* <CardAction>
                  <Badge variant="secondary">Featured</Badge>
                </CardAction> */}
                  <CardTitle>{p.name}</CardTitle>
                  {/* <CardDescription>
                  A practical talk on component APIs, accessibility, and shipping
                  faster.
                </CardDescription> */}
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      </section>

    </div>

}
    )
}