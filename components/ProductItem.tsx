import { memo, useState } from "react";
import { AddProductToWishlistProps } from "./AddProductToWishlist";
//import { AddProductToWishlist } from "./AddProductToWishlist";

// mesma coisa que o lazy do react, mas como está no next usar o do próprio next
import dynamic from "next/dynamic";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import("./AddProductToWishlist").then((mod) => mod.AddProductToWishlist); // se tiver utilizando o export default, não precisa fazer a parte do .then
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

// memo recebe dois parâmetros: o componente em si e quando temos objetos, arrays...elementos que não da pra comparar só usando ===, passamos uma função que vai retornar se o componente continua o mesmo ou não.
// a função sempre vai receber as propriedades anteriores e as próximas propriedades (que eu tenho agora)
// Object.is(prevProps, nextProps) ele faz uma comparação profunda
// só o primeiro parâmetro é obrigatório, se não passar o segundo, ele vai fazer uma comparação rasa (shallow), que é como se fosse com ===
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});
