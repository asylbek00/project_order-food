import React from "react";
import classes from "./CartItem.module.css";

function CartItem(props) {
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{props.price}</span>
          <span className={classes.amount}>{props.amount}x</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button
          onClick={() => {
            props.onAdd(props.item);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            props.onRemove(props.id);
          }}
        >
          -
        </button>
      </div>
    </li>
  );
}

export default CartItem;
