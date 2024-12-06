import { useEffect, useState } from "react";
import { fetchIssueData, GitHubIssueData } from "./github";

export function useGitHubIssueData(url: string | undefined) {
  const [data, setData] = useState<GitHubIssueData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchIssueData(url);
        setData(data);
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
