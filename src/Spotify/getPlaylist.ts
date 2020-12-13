// import fetch from "node-fetch";

// import { errorLogger } from "../misc";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function getPlaylist(accessToken: string, playlistID: string): Promise<any> {
//   const req = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`
//     }
//   });
//   // if (req.status === 429) { // if rate limited
//   //   errorLogger(`rate limited! (getPlaylist) - retry: ${req.headers.get("Retry-After")}`);
//   //   await sleep(parseInt(req.headers.get("Retry-After")) + 3);
//   // } else
//   if (req.status !== 200) { // if request not 200
//     const makeResJson = await req.json();
//     errorLogger(`unexpected error! (getPlaylist)\nstatus: ${req.status}\nerror: ${JSON.stringify(makeResJson, null, " ")}`);
//   } else {
//     return await req.json();
//   }
// }
