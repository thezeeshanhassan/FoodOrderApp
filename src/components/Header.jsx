import Button from "./UI/Button";
import img from "../assets/logo.jpg";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItem = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={img} alt="" />
        <h1>FoodOrderApp</h1>
      </div>
      <nav>
        <Button textOnly={true} onClick={handleShowCart}>
          Cart ({totalCartItem})
        </Button>
      </nav>
    </header>
  );
}
