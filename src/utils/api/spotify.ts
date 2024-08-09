export async function fetchSpotifyURL(url: string, token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP Error, Status ${response.status}`);
  }
  return response.json();
}
