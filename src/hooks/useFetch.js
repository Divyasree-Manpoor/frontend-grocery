import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useFetch = (apiCall, dependency = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await apiCall();
      setData(res.data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependency);

  return { data, loading, refetch: fetchData };
};

export default useFetch;