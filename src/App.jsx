import { useEffect, useState } from "react";
import CartList from "./cart/cartList";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const increase = (id) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );

      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cartUpdated"));

      return updated;
    });
  };

  const decrease = (id) => {
    setCart((prev) => {
      const updated = prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cartUpdated"));

      return updated;
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cartUpdated"));
      return updated;
    });
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalSum = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2 className="cart-header">Carts</h2>
      <CartList
        cart={cart}
        increase={increase}
        decrease={decrease}
        removeItem={removeItem}
      />
      <div className="cart-gap"></div>
      <div className="cart-bottom">
        <div className="carts-length">
          <h1>{totalCount}</h1> <p>Jami mahsulotlar</p> 
        </div>
        <div className="carts-sum">
          <h1>${totalSum.toFixed(2)}</h1> <p>Umumiy summa</p>
        </div>
      </div>
    </div>
  );
}

export default App;
