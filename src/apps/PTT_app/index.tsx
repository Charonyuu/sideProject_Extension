import React, { useState, CSSProperties } from "react";
import useFetchHotBoardList from "./hooks/useFetchHotBoardList";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Link } from "react-router-dom";

interface PttListType {
  name: string;
  type: string;
  title: string;
  url: string;
}

const PTTApp: React.FC = () => {
  const { data, loading, error } = useFetchHotBoardList();
  const [search, setSearch] = useState("");

  const FilterData: PttListType[] = data.filter((data: PttListType) =>
    data.name.includes(search)
  );
  console.log(FilterData);

  return (
    <div className="container h-full relative p-2">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-solid border border-gray-300 px-2 py-1 rounded-xl text-gray-600 mb-3"
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
              itemSize={70}
              width={width}
            >
              {({ index, style }: { index: number; style: CSSProperties }) => (
                <Link
                  to="board"
                  state={{ url: FilterData[index].url }}
                  style={style}
                  className="w-[350px] h-[40px]"
                >
                  <div className="bg-white rounded-xl p-2 items-center">
                    <div className="flex  ">
                      <p className="mr-0.5">{FilterData[index].name} </p>
                      <p>{"[" + FilterData[index].type + "]"} </p>
                    </div>
                    <p className="text-sm text-gray-400">
                      {FilterData[index].title}{" "}
                    </p>
                  </div>
                </Link>
              )}
            </List>
          )}
        </AutoSizer>
      )}
    </div>
  );
};

export default PTTApp;
