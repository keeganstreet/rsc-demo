// @ts-expect-error no types for react-server-dom-webpack yet
import ReactServerDOMServer from "react-server-dom-webpack/server.edge";
import App from "./App";

export function createRscAppStream(): ReadableStream<Uint8Array> {
  return ReactServerDOMServer.renderToReadableStream(<App />);
}
