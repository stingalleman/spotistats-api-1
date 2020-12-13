// import fetch from "node-fetch";
// import { errorLogger } from "../misc";
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function followPlaylist(accessToken: string, playlistID: string): Promise<string> {
//   const req = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/followers`, {
//     method: "PUT",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       public: true
//     })
//   });
//   // if (req.status === 429) { // if rate limited
//   //   errorLogger(`rate limited! (followPlaylist) - retry: ${req.headers.get("Retry-After")}`);
//   //   await sleep(parseInt(req.headers.get("Retry-After")) + 3);
//   // } else
//   if (req.status !== 200) { // if request not 200
//     errorLogger(`unexpected error! (followPlaylist)\nstatus: ${req.status}\nerror: ${await req.text()}`);
//   } else {
//     return "success";
//   }
// }
//# sourceMappingURL=followPlaylist.js.map