// import fetch from "node-fetch";
// import { errorLogger } from "../misc";
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function getRecentlyPlayed(accessToken: string): Promise<any> {
//   const req = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`
//     },
//   });
//   // if (req.status === 429) { // if rate limited
//   //   errorLogger(`rate limited! (getRecentlyPlayed) - retry: ${req.headers.get("Retry-After")}`);
//   //   await sleep(parseInt(req.headers.get("Retry-After")) + 3);
//   // } else
//   if (req.status !== 200) { // if request not 200
//     errorLogger(`unexpected error! (getRecentlyPlayed)\nstatus: ${req.status}\nerror: ${JSON.stringify(await req.json(), null, " ")}`);
//   } else {
//     return await req.json();
//   }
// }
//# sourceMappingURL=getRecentlyPlayed.js.map