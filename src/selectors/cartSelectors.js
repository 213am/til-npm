import { selector } from "recoil";
import { cartAtom } from "../atoms/cartAtoms";
import { productAtom } from "../atoms/productAtoms";

// 장바구니에 담긴 제품 총액
export const cartTotalSelector = selector({
  key: "cartTotal",
  get: ({ get }) => {
    // 장바구니
    const cart = get(cartAtom);
    // 제품 목록
    const productList = get(productAtom);
    // acc = accumulator 누적값
    // cur = currentValue 현재값
    // qty = quantity 수량
    return cart.reduce((acc, cur) => {
      const product = productList.find((item) => cur.id === item.id);
      // 전체 합산금액 계산
      // return 현재 금액 + (제품가격 * 장바구니에 담긴 갯수)
      return acc + product.price * cur.qty;
    }, 0);
  },
});

// 장바구니에 담긴 제품 수
export const cartItemCounterSelector = selector({
  key: "cartItemCount",
  get: ({ get }) => {
    const cart = get(cartAtom);
    return cart.reduce((acc, cur) => acc + cur.qty, 0);
  },
});
