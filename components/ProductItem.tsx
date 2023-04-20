import { memo } from "react";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => onAddToWishlist(product.id)}>Add to wishlist</button>
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
