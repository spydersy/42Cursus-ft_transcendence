import Authenticator from "./Authenticator.mjs";

// you can see the attached screen shot to know where get this variables
const UID          = "b645a2e7e9c3b0cc8345619af067b26396718e9a1d172c3f36fc602f6ce3cb20";
const SECRET       = "cf927296badecfd0a8e4dfb7a6303589ce67cb5e1f61b077a8d3b44da430fc23";
const REDIRECT_URI = "http://localhost:4242";

// 42 authenticator instance
var app = new Authenticator(UID, SECRET, REDIRECT_URI);

// after send the user to 42 site to authorize the app [example of 42 site: https://api.intra.42.fr/oauth/authorize?client_id=98a139f98b077445f8e84de4cb23e7668fb010a01b9c0ed20b8a4&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code]
// 42 redirect the user to the REDIRECT_URI (in this example is: http://localhost:3000) with the code in query string
// like that: http://localhost:3000/?code=7a0cb1a9c5b0fd31a0eb9c5f854fc2386b1edc2179f73c76904d65f5aae4e9bc
// get the code from the query string (code=7a0cb1a9c5b0fd31a0eb9c5f854fc2386b1edc2179f73c76904d65f5aae4e9bc)
// and give it to get_Access_token function like below
var token = app.get_Access_token("091f629db9f20af292f5055003ac431cd5b810abac974ff0b04c75f1677e6cbd");

token.then((data) => {
	// get the acces token of the user
	console.log("======================== auth user Data =========================");
	console.log(data);
	console.log("========================= 42 user data ==========================");
	// get the user info from 42 api
	app.get_user_data(data.access_token).then((data) => {
		console.log(data);
		console.log("=============================================================");
	});
});
