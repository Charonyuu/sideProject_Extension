import React, { useState, CSSProperties } from "react";
import useFetchBoardInfoList from "../../hooks/useFetchBoardInfoList";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Link, useLocation } from "react-router-dom";

interface PttBoardListType {
  date: string;
  author: string;
  title: string;
  url: string;
}
type PageType = {
  prev: string;
  next: string;
};
type FetchBoardInfoListResponse = {
  page: PageType;
  data: PttBoardListType[];
  loading: boolean;
  error: string;
};

const PTTBoradList: React.FC = () => {
  const location = useLocation();
  const { url }: { url: string } = location.state;
  const { data, page, loading, error }: FetchBoardInfoListResponse =
    useFetchBoardInfoList(url);
  const [search, setSearch] = useState("");

  return (
    <div className="container h-full relative p-2">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-solid border border-gray-300 px-2 py-1 rounded-xl text-gray-600 mb-3"
        placeholder="Search..."
      />
      <button>搜尋</button>
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
              itemCount={data.length}
              itemSize={70}
              width={width}
            >
              {({ index, style }: { index: number; style: CSSProperties }) => (
                <Link to="" style={style} className="w-[350px] h-[40px]">
                  <div className="bg-white rounded-xl p-2 items-center">
                    <p className="truncate">{data[index].title} </p>
                    <div className="flex justify-between text-gray-400 text-sm ">
                      <p>{data[index].author}</p>
                      <p>{data[index].date}</p>
                    </div>
                  </div>
                  {/* <div>{data.dataList[index].url} </div> */}
                </Link>
              )}
            </List>
          )}
        </AutoSizer>
      )}
    </div>
  );
};

export default PTTBoradList;
