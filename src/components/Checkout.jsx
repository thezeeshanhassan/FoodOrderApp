import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Inputs from "./UI/Inputs";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import axios from "axios";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    axios.post("http://localhost:3000/orders", customerData, cartCtx.items);

    // fetch("http://localhost:3000/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartCtx.items,
    //       customer: customerData,
    //     },
    //   }),
    // });
  }

  return (
    <Modal open={userProgressCtx.progress == "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(cartTotal)}</p>

        <Inputs label={"Full Name"} type={"text"} id={"name"}></Inputs>
        <Inputs label={"Email Address"} type={"text"} id={"emai"}></Inputs>
        <Inputs label={"Street Address"} type={"text"} id={"street"}></Inputs>

        <div className="control-row">
          <Inputs
            label={"Postal code"}
            type={"text"}
            id={"postal-code"}
          ></Inputs>
          <Inputs label={"City"} type={"text"} id={"city"}></Inputs>
        </div>
        <p className="modal-actions">
          <Button textOnly={true} type={"button"} onClick={handleClose}>
            Close
          </Button>
          <Button> Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
