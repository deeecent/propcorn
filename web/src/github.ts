export interface GitHubIssueData {
  title: string;
  body: string;
  author: string;
  labels: string[];
  createdAt: string;
  updatedAt: string;
  url: string;
  orgAvatar: string | null;
  org: string;
  repo: string;
}

export async function fetchIssueData(
  issueUrl: string,
): Promise<GitHubIssueData | null> {
  try {
    const match = issueUrl.match(
      /https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)/,
    );
    if (!match) {
      throw new Error("Invalid GitHub issue URL");
    }

    const [_, org, repo, issueNumber] = match;
    const apiUrl = `https://api.github.com/repos/${org}/${repo}/issues/${issueNumber}`;

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch issue data: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      title: data.title,
      body: data.body,
      author: data.user.login,
      labels: data.labels.map((label: any) => label.name),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      url: data.html_url,
      orgAvatar: null, //await fetchOrganizationAvatar(org),
      repo,
      org,
    };
  } catch (error) {
    console.error("Error fetching GitHub issue metadata:", error);
    return null;
  }
}

export async function fetchOrganizationAvatar(
  org: string,
): Promise<string | null> {
  try {
    const apiUrl = `https://api.github.com/orgs/${org}`;
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch organization data: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data.avatar_url || null; // Returns the organization logo URL
  } catch (error) {
    console.error("Error fetching organization logo:", error);
    return null;
  }
}
