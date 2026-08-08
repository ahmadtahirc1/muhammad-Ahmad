const OWNER = "ahmadtahirc1";
const REPO = "muhammad-Ahmad";
const BRANCH = "main";

function authHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      "GITHUB_TOKEN is not configured. Add it in your Vercel project's environment variables."
    );
  }
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function getFile(path: string) {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`,
    { headers: authHeaders(), cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error(`Failed to read ${path} from GitHub (${res.status})`);
  }
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { content, sha: data.sha as string };
}

export async function getFileSha(path: string): Promise<string | null> {
  try {
    const { sha } = await getFile(path);
    return sha;
  } catch {
    return null;
  }
}

export async function putFile(
  path: string,
  base64Content: string,
  sha: string | null,
  message: string
) {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        content: base64Content,
        branch: BRANCH,
        ...(sha ? { sha } : {}),
      }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to write ${path} to GitHub (${res.status}): ${text}`);
  }
  return res.json();
}
