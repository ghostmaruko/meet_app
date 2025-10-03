"use strict";

const { google } = require("googleapis");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const REDIRECT_URI = "https://meet-app-silk.vercel.app/";

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

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
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// === Funzione 2: Ottieni Access Token usando il code ===
module.exports.getAccessToken = async (event) => {
  const code = decodeURIComponent(event.pathParameters.code);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, tokens) => {
      if (error) return reject(error);
      resolve(tokens);
    });
  })
    .then((tokens) => ({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(tokens),
    }))
    .catch((error) => ({
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message }),
    }));
};

// === Funzione 3: Ottieni eventi dal calendario ===
module.exports.getCalendarEvents = async (event) => {
  const { access_token } = event.pathParameters;

  const client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  client.setCredentials({ access_token });

  const calendar = google.calendar({ version: "v3", auth: client });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID, // dal tuo config.json
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) return reject(error);
        resolve({
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({ events: response.data.items }),
        });
      }
    );
  }).catch((error) => ({
    statusCode: 500,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ error: error.message }),
  }));
};
