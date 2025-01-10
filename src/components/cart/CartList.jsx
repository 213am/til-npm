import { useRecoilValue } from "recoil";
import { cartAtom } from "../../atoms/cartAtoms";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function CartList() {
  const cart = useRecoilValue(cartAtom);

  return (
    <div>
      <h1> 내 장바구니</h1>
      <CartSummary />
      <div>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default CartList;
