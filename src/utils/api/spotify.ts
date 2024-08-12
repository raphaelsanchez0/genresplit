export async function fetchSpotifyURL(url: string, token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `HTTP Error, Status ${response.status}: ${response.statusText}`
    );
  }
  return response.json();
}

export function createPostRequestHeaders(token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return headers;
}
