import { useEffect, useState } from "react";
import { fetchIssueData, GitHubIssueData } from "./github";

const CACHE_KEY_PREFIX = "githubIssue:";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 1 day in milliseconds

export function useGitHubIssueData(url: string | undefined) {
  const [data, setData] = useState<GitHubIssueData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        setIsLoading(false);
        return;
      }

      const cacheKey = `${CACHE_KEY_PREFIX}${url}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const cachedData = JSON.parse(cached);
        if (Date.now() - cachedData.timestamp < CACHE_TTL) {
          setData(cachedData.data);
          setIsLoading(false);
          return;
        } else {
          // Remove stale cache
          localStorage.removeItem(cacheKey);
        }
      }

      try {
        setIsLoading(true);
        const fetchedData = await fetchIssueData(url);
        setData(fetchedData);

        // Save to cache
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: fetchedData,
            timestamp: Date.now(),
          }),
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}
