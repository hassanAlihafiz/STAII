// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"

const isDev = process.env.NODE_ENV === "development"
console.log("isDev", isDev)
if (!isDev) {
  Sentry.init({
    dsn: "https://5351b409b9920987fcc204d5e8597539@o4504789282455552.ingest.sentry.io/4505981202792448",

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  })
}
