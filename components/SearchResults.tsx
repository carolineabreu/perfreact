import { useMemo } from "react";
import { ProductItem } from "./ProductItem";
import { ReactNode } from "react";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}

export function SearchResults({ results }: SearchResultsProps) {
  // useMemo recebe dois parâmetros: uma função como primeiro parâmetro que precisa devolver o resultado e o segundo parâmetro é um array de dependências (como no useEffect), pra dizer quando que queremos que o cálculo seja refeito

  const totalPrice = useMemo(() => {
    return results.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
  }, [results]);

  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </div>
  );
}
