import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import connectDB from "./db/db";
import path from "path";

dotenv.config({ path: "../.env" });
const port = process.env.PORT || 5000;

// connect to db
connectDB();
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  // get the path of parent of the current directory
  const __dirname = path.dirname(path.resolve());

  // make dist folder a static folder
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // send index.html file when the user hits the home route
  app.get("*", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Seerver");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
