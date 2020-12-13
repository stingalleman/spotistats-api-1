// import fetch from "node-fetch";
// import { errorLogger } from "../misc";
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function getTopTracks(accessToken: string): Promise<any> {
//   try {
//   const req = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term", { // get accesstoken
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`
//     },
//   });
//   // if (req.status === 429) { // if rate limited
//   //   errorLogger(`rate limited! (getTopTracks) - retry: ${req.headers.get("Retry-After")}`);
//   //   await sleep(parseInt(req.headers.get("Retry-After")) + 3);
//   // } else
//   if (req.status !== 200) { // if request not 200
//     errorLogger(`unexpected error! (getTopTracks)\nstatus: ${req.status}\nerror: ${JSON.stringify(await req.json(), null, " ")}`);
//   } else {
//     return await req.json();
// 	}
// 	} catch(err) {
// 	errorLogger('reeee', err)
// 	}
// }
//# sourceMappingURL=getTopTracks.js.map