import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import bodyParser from 'body-parser';
// Create Express app
const app = express();

// Middleware for CORS
// app.use(
//   cors({
//     origin: ['https://checkbeackd.onrender.com'], // Allow requests from specified origin
//     methods:['GET','POST'],
//     credentials: true, // Allow sending cookies
//   })
// );
app.use(cors()); 
// app.use(bodyParser.json());
// Middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: "20kb" })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: "20kb" })); // Limit URL-encoded payload size

// Middleware for serving static files from public directory
app.use(express.static("public"));

// Middleware for parsing cookies
app.use(cookieParser());

// Import routers
import userRouter from "./routes/users.route.js";
import videoRouter from "./routes/video.route.js";
import commentRouter from "./routes/comment.route.js";
import tweetRouter from "./routes/tweet.route.js";
import playlistRouter from "./routes/playlist.route.js";
import subscriptionRouter from "./routes/subscription.route.js";
import { toggleLike, toggleDislike } from "./controllers/like.controller.js";
import { verifyJWT } from "./middlewares/auth.middleware.js";

// Mount routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/tweet", tweetRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/subscription", subscriptionRouter);

// Routes for liking and disliking

app.post("/api/v1/like/video/:videoId", verifyJWT, toggleLike);
app.post("/api/v1/dislike/video/:videoId", verifyJWT, toggleDislike);

// Export the Express app
export { app };
