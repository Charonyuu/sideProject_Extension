import React, { useState, CSSProperties } from "react";
import useFetchData from "./hooks/useFetchData";
import DataCard from "./component/dataCard";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

interface stockInfoType {
  stock_current_price: number;
  stock_gap: number;
  stock_name: string;
  stock_num: string;
  stock_predict_price: number;
  stock_time: string;
}

const ETFApp: React.FC = () => {
  const STOCK_COMPANY_ARRAY = [
    "街口",
    "台新",
    "第一金",
    "新光",
    "中信",
    "統一",
    "FT",
    "凱基",
    "富邦",
    "元大",
    "國泰",
    "永豐",
    "FH",
    "大華",
    "群益",
    "兆豐",
  ];
  const { data, loading, error } = useFetchData();
  const [search, setSearch] = useState("");

  const FilterData = data.filter(
    (data: stockInfoType) =>
      data.stock_name.includes(search) || data.stock_num.includes(search)
  );
  console.log(FilterData);

  return (
    <div className="container h-full relative p-2">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-solid border border-gray-300 px-2 py-1 rounded-xl text-gray-600 mb-1"
        placeholder="Search..."
      />
      {loading ? (
        <div className="loading absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src="/loading.svg" className="w-[56px] h-[50px] mx-auto" />
          <p className="text-center text-transparent bg-gradient-to-r from-yellow-400 via-purple-500 to-cyan-500 bg-clip-text text-transparent bg-gradient-to-r bg-clip-text text-transparent animate-shine">
            抓取資料中...
          </p>
          {error && error}
        </div>
      ) : (
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <List
              height={height}
              itemCount={FilterData.length}
              itemSize={160}
              width={width}
            >
              {({ index, style }: { index: number; style: CSSProperties }) => (
                <div style={style} className="w-[350px]">
                  <DataCard stock={FilterData[index]} />
                </div>
              )}
            </List>
          )}
        </AutoSizer>
      )}
    </div>
  );
};

export default ETFApp;
