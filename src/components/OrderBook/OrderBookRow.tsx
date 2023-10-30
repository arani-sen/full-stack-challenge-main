import { useEffect, useState } from "react";

type t_OrderBookRow_Props = {
  cols: Array<any>;
  className?: string;
};
const OrderBookRow = ({ cols, className }: t_OrderBookRow_Props) => {
  return (
    <div className={`grid grid-cols-2 ${className || ""}`}>
      <div className="px-2 border border-[#151f27]">{cols[0]}</div>
      <div className="px-2 border text-[#bfc1c8] border-[#151f27] transition-all">
        {cols[1]}
      </div>
    </div>
  );
};

export default OrderBookRow;
