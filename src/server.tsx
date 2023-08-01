import stream from "stream";
import express from "express";
import { createServer } from "http";
import { createRscAppStream } from "./create-rsc-app-stream";

const app = express();

app.use("/", async (req, res, next) => {
  const readableWebStream = createRscAppStream();

  stream.Readable.fromWeb(readableWebStream as any).pipe(res);
});

const server = createServer(app)
  .listen("3000", () => console.log(`Server running on port 3000`))
  .on("error", (error) => {
    console.log("Failed to start server");
    process.exit(2);
  });
