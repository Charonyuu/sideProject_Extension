import React from "react";
import { AiOutlineHeart, AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

interface stockInfoType {
  stock_current_price: number;
  stock_gap: number;
  stock_name: string;
  stock_num: string;
  stock_predict_price: number;
  stock_time: string;
}

export default function DataCard({ stock }: { stock: stockInfoType }) {
  const {
    stock_current_price,
    stock_gap,
    stock_name,
    stock_num,
    stock_predict_price,
    stock_time,
  } = stock;
  return (
    <div className="w-350 h-150 border border-[#67b6eb] rounded-[20px] overflow-hidden relative my-[10px]">
      <div className="bg-[#67b6eb] text-white rounded-[20px_20px_0_0] p-2 flex">
        <h4>{stock_num}</h4>
        <p className="overflow-hidden text-center truncate whitespace-nowrap w-[90%] ml-2">
          {stock_name}
        </p>
      </div>
      <div className="flex justify-around my-2">
        <div className="text-center">
          <p>目前成交價</p>
          <h4
            style={{
              color: stock_gap > 0 ? "red" : "green",
              textDecoration: "underline",
            }}
          >
            {stock_current_price}
          </h4>
        </div>
        <div className="text-center">
          <p>預估淨值</p>
          <h4 className="text-blue-600">{stock_predict_price}</h4>
        </div>
        <div className="text-center">
          <p>折益價</p>
          {stock_gap > 0 ? (
            <p className="overPrice flex items-center font-semibold text-red-600">
              <AiFillCaretUp />
              {stock_gap}%
            </p>
          ) : (
            <p className="belowPrice flex items-center font-semibold text-green-600">
              <AiFillCaretDown />
              {stock_gap}%
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-between px-2 mb-2">
        <AiOutlineHeart fontSize="25px" className="text-red-400" />
        <h6 className="text-sm">{stock_time}</h6>
      </div>
    </div>
  );
}
