import cors from "cors";

export const corsConfig = () => {
  return cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:8000",
        "http://localhost:3000",
        "www.movie-app.com",
        "*",
      ];
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-version"],
    credentials: true,
    preflightContinue: false,
    maxAge: 600, // cache preflight response for 10 minutes
    optionsSuccessStatus: 204,
  });
};
