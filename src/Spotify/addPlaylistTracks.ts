// import fetch from "node-fetch";

// import { errorLogger } from "../misc";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function addPlaylistTracks(accessToken: string, playlistID: string, tracks: string[]): Promise<void> {
//   const req = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       "uris": tracks,
//     })
//   });
//   // if (req.status === 429) { // if rate limited
//   //   errorLogger(`rate limited! (addPlaylistTracks) - retry: ${req.headers.get("Retry-After")}`);
//   //   await sleep(parseInt(req.headers.get("Retry-After")) + 3);
//   // } else
//   if (req.status !== 201) { // if request not 200
//     errorLogger(`unexpected error! (addPlaylistTracks,)\nplaylist id: ${playlistID}\nstatus: ${req.status}\nerror: ${JSON.stringify(await req.json(), null, " ")}`);
//   } else {
//     return await req.json();
//   }
// }
