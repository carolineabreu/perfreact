import { SearchResults } from "@/components/SearchResults";
import { FormEvent, useCallback, useState } from "react";

type Data = {
  id: number;
  price: number;
  title: string;
};

type Results = {
  totalPrice: number;
  data: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });

  async function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    // formatação aqui e não dentro do priceFormatted pra não ficar criando toda vez
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product: Data) => {
      return {
        id: product.id,
        price: product.price,
        title: product.title,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice = data.reduce((acc: number, product: any) => {
      return acc + product.price;
    }, 0);

    setResults({ totalPrice, data: products });
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishlist={addToWishlist}
      />
    </div>
  );
}
