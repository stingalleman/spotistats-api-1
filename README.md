# Spotistats API V1
The official API for the Spotistats app (Android + iOS)

Tech stack used:
- **GraphQL** - Query user data
- **Express** and **Node.js** - Server and authentication
- **MongoDB** - Data storage

**Please note that this project is not build for reproduction, but as an API for the [Spotistats App](https://spotistats.app)**

## Installation

1. Clone this repo
2. Open the project directory in a terminal and run `npm install` to install the dependencies needed.

Some additional configuration steps are described below.

### Spotify settings

In order to run this project, you need to create a Spotify app in the [developer dashboard](https://developer.spotify.com/dashboard). Then you can get the **Client ID** and **Client Secret** needed for the environment configuration.

You will additionally need to set up the callback URL. This will be the URL of your client that will be redirected to after the user logins with Spotify. This will need to be added to the environment variables and to the Spotify app settings under **Redirect URIs**.

### Environment variables

Make sure to configure the environment variables before running. For this you will need:

- The URI to your MongoDB instance as well as the login information.
- The Spotify app's **Client ID**, **Client Secret**, and **Redirect URI** mentioned in the section above.
- A string to be used as the secret in the JWT token generation.

There is a template for the expected environment variables in `src/config/.env.template`. The default configuration expects the file `src/config/.env.development` to exist, so duplicate the template and rename it.

## Running the project

Before running the project make sure the MongoDB database you configured in the environment file is running.

### Running Locally

To run the API locally you can use `npm run start:dev`. 

This launches the API server on port 8080 and uses the file `src/config/.env.development` to set the environment. Either create one following the template or change the location in the `package.json`

## Credits
I recycled some code from [@stingalleman](https://github.com/stingalleman) and [@pedronave](https://github.com/pedronave). Thanks 🙃
