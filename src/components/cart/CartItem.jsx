import { useRecoilState, useRecoilValue } from "recoil";
import { productAtom } from "../../atoms/productAtoms";
import { cartAtom } from "../../atoms/cartAtoms";

function CartItem({ item }) {
  const [cartItem, setCartItem] = useRecoilState(cartAtom);
  const products = useRecoilValue(productAtom);
  const product = products.find((prd) => prd.id === item.id);

  const removeCart = (id) => {
    setCartItem((cur) => cur.filter((prd) => prd.id !== id));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "5px 15px",
      }}
    >
      <h3>제품이름 : {product.name}</h3>
      <p>수량 : {item.qty}</p>
      <p>가격 : {(product.price * item.qty).toLocaleString()}원</p>
      <button onClick={() => removeCart(item.id)}>삭제</button>
    </div>
  );
}

export default CartItem;
