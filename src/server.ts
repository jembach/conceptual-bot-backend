import express from "express";
import mongoose from "mongoose";
import botModelRoutes from "./routes/botModelRoutes";
import cors from "cors";

class App {
  private static get port(): string {
    return process.env.PORT || "3001";
  }

  private static async startApiServer() {
    const app = express();

    app.use(cors());

    app.use(express.static("public"));

    app.use(express.json());

    app.use("/api/botModels", botModelRoutes);

    app.listen(App.port, () => {
      console.log(`Server listening on http://localhost:${App.port} ...`);
    });
  }

  constructor() {
    const db = mongoose.connection;
    // tslint:disable-next-line: no-console
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", App.startApiServer);

    mongoose.connect(
      `mongodb://${process.env.MONGO_HOST || "127.0.0.1:27017"}`
    );
    mongoose.set("returnOriginal", false);
  }
}

new App();
