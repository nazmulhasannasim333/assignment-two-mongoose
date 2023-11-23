import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/users/user.router";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running on port 5000");
});
export default app;
