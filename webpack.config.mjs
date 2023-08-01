import path from "path";
import {
  WebpackRscClientPlugin,
  WebpackRscServerPlugin,
  createWebpackRscClientLoader,
  createWebpackRscServerLoader,
  createWebpackRscSsrLoader,
  webpackRscLayerName,
} from "@mfng/webpack-rsc";

const clientReferencesMap = new Map();
const serverReferencesMap = new Map();
const rscServerLoader = createWebpackRscServerLoader({ clientReferencesMap });
const rscSsrLoader = createWebpackRscSsrLoader();
const rscClientLoader = createWebpackRscClientLoader({ serverReferencesMap });

const serverConfig = {
  name: "server",
  mode: "development",
  target: "node",
  entry: "./src/server.tsx",
  output: {
    path: path.resolve("dist/server"),
    chunkFormat: "module",
  },
  module: {
    rules: [
      {
        // Match the resource path of the modules that create RSC streams, e.g.:
        resource: (value) => /create-rsc-app-stream/.test(value),
        layer: webpackRscLayerName,
      },
      {
        issuerLayer: webpackRscLayerName,
        resolve: { conditionNames: ["react-server", "..."] },
      },
      {
        oneOf: [
          {
            issuerLayer: webpackRscLayerName,
            test: /\.tsx?$/,
            use: [rscServerLoader, "ts-loader"],
          },
          {
            test: /\.tsx?$/,
            use: [rscSsrLoader, "ts-loader"],
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new WebpackRscServerPlugin({
      clientReferencesMap,
      serverReferencesMap,
    }),
  ],
  experiments: { layers: true },
  devtool: "source-map",
};

const clientConfig = {
  name: "client",
  mode: "development",
  target: "web",
  dependencies: ["server"],
  entry: "./src/client.tsx",
  output: {
    path: path.resolve("dist/client"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [rscClientLoader, "ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new WebpackRscClientPlugin({
      clientReferencesMap,
    }),
  ],
  devtool: "source-map",
};

export default [serverConfig, clientConfig];
