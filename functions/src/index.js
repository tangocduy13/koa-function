import * as functions from "firebase-functions";
import apiHandler from "./handlers/api";

exports.api = functions.https.onRequest(apiHandler.callback());
