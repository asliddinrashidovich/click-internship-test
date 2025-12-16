function CartItem({ item, increase, decrease, removeItem }) {
  return (
    <div className="carts-item">
      <div className="carts-item-img">
        <img src={item.image} alt={item.title} width={30} height={30} />
      </div>

      <h3>{item.title.slice(0, 20)}</h3>

      <p>${item.price}</p>

      <div className="carts-item-buttons">
        <button onClick={() => decrease(item.id)}>
          <p>-</p>
        </button>
        <p className="carts-item-count">{item.quantity}</p>
        <button onClick={() => increase(item.id)}>
          <p>+</p>
        </button>
      </div>

      <button className="remover" onClick={() => removeItem(item.id)}>✕</button>
    </div>
  );
}

export default CartItem;
