import { useRecoilState } from "recoil";
import { cartAtom } from "../../atoms/cartAtoms";

function ProductItem({ product }) {
  const [cart, setCart] = useRecoilState(cartAtom);

  // 장바구니 담기
  const addCart = (id) => {
    // id 를 전달받으면 cart 에 제품 id 와 qty(수량) 업데이트
    setCart((currentCart) => {
      // 현재 카드에 이미 동일한 제품 id 가 있는지 검사
      const existID = currentCart.find((item) => item.id === id);
      // 만약 카트에 이미 제품이 있다면 수량만 증가
      if (existID) {
        //수량 증가
        return currentCart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      // 새로운 제품 id 추가 및 수량은 1로 최초등록
      return [...currentCart, { id: id, aty: 1 }];
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        border: "1px solid black",
        width: "230px",
        padding: "5px 15px",
      }}
    >
      <h3>{product.name}</h3>
      <span>{product.price}원</span>
      <button onClick={() => addCart(product.id)}>장바구니 담기</button>
    </div>
  );
}

export default ProductItem;
