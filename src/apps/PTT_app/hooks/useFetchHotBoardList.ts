import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/constant";

export default function useFetchHotBoardList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const FetchData = async () => {
    await axios(`${API}/menu/api/getPTTHotBoardList`)
      .then((response) => {
        setData(response.data);
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
  return { data, loading, error };
}
