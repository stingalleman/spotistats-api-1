// import fetch from "node-fetch";
// import { errorLogger } from "../misc";
// import { User } from "../entities";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function getAccessToken(refreshToken: string, userID: string): Promise<string> {
//   const req = await fetch("https://accounts.spotify.com/api/token", { // get accesstoken
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Authorization": `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")}`
//     },
//     body: `grant_type=refresh_token&refresh_token=${refreshToken}`
//   });
//   // if (req.status === 429) { // if rate limited
//   //   errorLogger(`rate limited! (getAccessToken) - retry: ${req.headers.get("Retry-After")}`);
//   //   await sleep(parseInt(req.headers.get("Retry-After")) + 3);
//   // } else
//   if (req.status === 400) {
//     const json = await req.json();
//     if (json.error_description === "Refresh token revoked") {
//       await User.create({
//         id: userID,
//         settings: {
//           disabled: true,
//           error: "Refresh Token Revoked"
//         }
//       }).save();
//       errorLogger(`user ${userID} revoked his refresh token!`);
//     }
//   } else if (req.status !== 200) { // if request not 200
//     errorLogger(`unexpected error! (getAccessToken)\nstatus: ${req.status}\nerror: ${JSON.stringify(await req.json(), null, " ")}`);
//   } else {
//     const json = await req.json();

//     return json.access_token;
//   }
// }
