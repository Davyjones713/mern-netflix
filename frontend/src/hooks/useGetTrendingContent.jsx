import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

function useGetTrendingContent() {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    let isMounted = true;

    const getTrendingContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/trending`);
        if (isMounted) {
          setTrendingContent(res.data.content);
        }
      } catch (error) {
        console.error("Error fetching trending content", error);
      }
    };

    getTrendingContent();

    return () => {
      isMounted = false;
    };
  }, [contentType]);

  return { trendingContent };
}

export default useGetTrendingContent;
