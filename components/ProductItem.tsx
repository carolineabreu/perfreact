import { memo } from "react";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
}

function ProductItemComponent({ product }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  );
}

// memo recebe dois parametros: o componente em si e quando temos objetos, arrays...elementos que não da pra comparar só usando ===, passamos uma função que vai retornar se o componente continua o mesmo ou não.
// a função sempre vai receber as propriedas anteriores e as próximas propriedades (que eu tenho agora)
// Object.is(prevProps, nextProps) ele faz uma comparação profunda
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});
