module.exports = {
    PORT: process.env.PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    DB: {
      PGHOST: process.env.PGHOST,
      PGUSER: process.env.PGUSER,
      PGDATABASE: process.env.PGDATABASE,
      PGPASSWORD: process.env.PGPASSWORD,
      PGPORT: process.env.PGPORT
    },
    GOOGLE: {
      CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
      CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
    },
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  }