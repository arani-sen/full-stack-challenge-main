import { useReducer } from "react";
import OrderBookRow from "./OrderBookRow";
import { orderBookReducer } from "./OrderBookReducer";

export type t_Order = {
  symbol: string;
  id: number;
  side: "Sell" | "Buy";
  price: number;
  size: number;
};

export type t_Order_Event = {
  action: "partial" | "update" | "delete" | "insert";
  data: Array<t_Order>;
};

export type t_Order_Book = {
  Sell: {
    [key: number]: t_Order;
  };
  Buy: {
    [key: number]: t_Order;
  };
  loading: boolean;
  midPoint: number;
};

const OrderBook = () => {
  const [orderBookState, dispatchOrderBook] = useReducer(orderBookReducer, {
    Sell: {},
    Buy: {},
    loading: true,
    midPoint: 0,
  });
  const ws = new WebSocket("wss://ws.bitmex.com/realtime");

  ws.onopen = () => {
    ws.send(
      JSON.stringify({ op: "subscribe", args: [`orderBookL2_25:XBTUSDT`] })
    );
  };

  ws.onmessage = (msg) => {
    const request = JSON.parse(msg.data as string) as t_Order_Event;
    dispatchOrderBook(request);
  };

  return (
    <div className=" m-3 max-w-md bg-[#212a3f]  text-[#bfc1c8]">
      <div className="text-center whitespace-normal border-[#263946]">
        XBT/USDt
      </div>
      <OrderBookRow cols={["Price", "Size"]} />
      {orderBookState.loading
        ? "Loading"
        : Object.values(orderBookState.Sell)
            .sort((a, b) => b.price - a.price)
            .slice(-15)
            .map((val, i) => (
              <OrderBookRow
                key={i}
                cols={[val.price, val.size]}
                className={`text-red-600 ${
                  i % 2 ? "bg-[#26314b]" : "bg-[#212a3f]"
                }`}
              />
            ))}
      <div className="text-center whitespace-normal border-[#263946]">
        Midpoint Price: {orderBookState.midPoint}
      </div>
      {orderBookState.loading
        ? "Loading"
        : Object.values(orderBookState.Buy)
            .sort((a, b) => b.price - a.price)
            .slice(0, 15)
            .map((val, i) => (
              <OrderBookRow
                key={i}
                cols={[val.price, val.size]}
                className={`text-green-600 ${
                  i % 2 ? "bg-[#26314b]" : "bg-[#212a3f]"
                }`}
              />
            ))}
    </div>
  );
};

export default OrderBook;
