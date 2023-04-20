//import { useMemo } from "react";
import { List, ListRowRenderer } from "react-virtualized";

import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
  onAddToWishlist: (id: number) => void;
}

export function SearchResults({ results, onAddToWishlist, totalPrice }: SearchResultsProps) {
  // useMemo recebe dois parâmetros: uma função como primeiro parâmetro que precisa devolver o resultado e o segundo parâmetro é um array de dependências (como no useEffect), pra dizer quando que queremos que o cálculo seja refeito

  // const totalPrice = useMemo(() => {
  //   return results.reduce((acc, product) => {
  //     return acc + product.price;
  //   }, 0);
  // }, [results]);

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem product={results[index]} onAddToWishlist={onAddToWishlist} />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
      {/**para ser automático width e height, importar auto de dentro do react-virtualized */}
      {/* {results.map((product) => {
        return <ProductItem key={product.id} product={product} onAddToWishlist={onAddToWishlist} />;
      })} */}
    </div>
  );
}
