import { useStore } from "../Contexts/StoreContext";
import { Card } from "./Card";

export const Products = () => {
  const { products } = useStore();
  return (
    <div className="flex min-h-[calc(100vh-66px)] flex-wrap items-center justify-center gap-8 bg-neutral p-8">
      {products &&
        products.map((product) => <Card key={product.id} product={product} />)}
    </div>
  );
};
