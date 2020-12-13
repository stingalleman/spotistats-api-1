// import fetch from "node-fetch";

// import { errorLogger } from "../misc";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function createPlaylist(accessToken: string, userID: string, display_name: string): Promise<any> {
//   const res = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       name: `${display_name}'s Top Tracks (Past 4 Weeks)`,
//       public: true,
//       collaborative: false,
//       description: `Generated and synced by Spotistats for iPhone and Android. Last sync: ${new Date().toLocaleString("en-us", { weekday: "long" })}`
//     })
//   });
//   // if (res.status === 429) { // if rate limited
//   //   errorLogger(`rate limited! (createPlaylist) - retry: ${res.headers.get("Retry-After")}`);
//   //   await sleep(parseInt(res.headers.get("Retry-After")) + 3);
//   // } else
//   if (res.status !== (201 || 200)) { // if request not 200
//     errorLogger(`unexpected error! (createPlaylist)\nstatus: ${res.status}\nerror: ${JSON.stringify(await res.json(), null, " ")}`);
//   } else {
//     return await res.json();
//   }
// }
