"use strict";

const { google } = require("googleapis");
const calendar = google.calendar("v3");

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.public.readonly",
];

const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ["https://meet-app-silk.vercel.app/"];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

// === Funzione 1: Genera URL di autorizzazione ===
module.exports.getAuthURL = async () => {
  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ authUrl }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// === Funzione 2: Ottieni Access Token usando il code ===
module.exports.getAccessToken = async (event) => {
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, tokens) => {
      if (error) {
        return reject(error);
      }
      return resolve(tokens);
    });
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {
  const { access_token } = event.pathParameters;

  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const CALENDAR_ID = "fullstackwebdev@gmail.com"; // inserisci il tuo calendario pubblico

    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ events: response.data.items }),
          });
        }
      }
    );
  });
};
