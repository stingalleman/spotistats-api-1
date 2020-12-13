// import fetch from "node-fetch";
// import { errorLogger } from "../misc/Logger";
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function getUser(accessToken: string): Promise<any> {
//   const req = await fetch("https://api.spotify.com/v1/me", { // get accesstoken
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`
//     },
//   });
//   // if (req.status === 429) { // if rate limited
//   //   errorLogger(`rate limited! (getUser) - retry: ${req.headers.get("Retry-After")}`);
//   //   await sleep(parseInt(req.headers.get("Retry-After")) + 3);
//   // } else
//   if (req.status !== 200) { // if request not 200
//     errorLogger(`unexpected error! (getUser)\nstatus: ${req.status}\nerror: ${JSON.stringify(await req.json(), null, " ")}`);
//   } else {
//     return await req.json();
//   }
// }
//# sourceMappingURL=getUser.js.map