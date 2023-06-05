import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/constant";

export default function useFetchBoardInfoList(url: string) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({ prev: "", next: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const FetchData = async () => {
    await axios
      .post(`${API}/menu/api/getPPTBoardInfoList`, { url })
      .then((response) => {
        setData(response.data.dataList);
        setPage({ prev: response.data.prev, next: response.data.next });
        setLoading(false);
      })
      .catch((err) => {
        console.log("error:" + err);
        setError(err.toString());
      });

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    FetchData();
  }, []);
  return { data, page, loading, error };
}
