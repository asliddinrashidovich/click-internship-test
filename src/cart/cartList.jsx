import CartItem from "./cartItem";

function CartList({ cart, increase, decrease, removeItem }) {
  if (cart.length === 0) {
    return <p style={{ color: "#fff" }}>Savat bo‘sh</p>;
  }
  return cart.map((item) => (
    <CartItem
      key={item.id}
      item={item}
      increase={increase}
      decrease={decrease}
      removeItem={removeItem}
    />
  ));
}

export default CartList;
