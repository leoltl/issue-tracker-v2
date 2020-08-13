import express from "express";

const app = express();
const port = 3000;

import morgan from "morgan";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use(cors({
  origin: 'http://localhost:8080'
}));

import { extractUserFromHeader } from "./middlewares/authentication/jwt";
app.use(extractUserFromHeader);

import addRoutes from "./routes";
app.use(addRoutes(express.Router()));

import addErrorHandler from './middlewares/error-handler';
addErrorHandler(app);

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});