import React from "react";

export const CounterContext = React.createContext({
  count: 0,
  setCount: (delta: number) => {}
});

export const OrdersContext = React.createContext({
  orders: 0,
  setOrders: (amnt: number) => {}
});