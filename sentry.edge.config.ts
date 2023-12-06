// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
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
