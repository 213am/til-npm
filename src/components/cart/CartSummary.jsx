import { useRecoilValue } from "recoil";
import {
  cartItemCounterSelector,
  cartTotalSelector,
} from "../../selectors/cartSelectors";

function CartSummary() {
  const totalPrice = useRecoilValue(cartTotalSelector);
  const totalCount = useRecoilValue(cartItemCounterSelector);

  return (
    <div>
      <p>총 상품 수 : {totalCount}</p>
      <p>총 금액 : {totalPrice}원</p>
    </div>
  );
}

export default CartSummary;
