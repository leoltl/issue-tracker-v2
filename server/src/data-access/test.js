// import mongoose from "mongoose";
// import { UserSchema, IssueSchema, ProjectSchema } from "./schema";
const mongoose = require("mongoose");
const schemas = require("./mongo/schema");
const { UserSchema, IssueSchema, ProjectSchema } = schemas;
const { mongoDatabase } = require("./mongo/database");

function connectionFactory() {
  const conn = mongoose.createConnection(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  conn.model('User', UserSchema);
  conn.model("Issue", IssueSchema);
  conn.model("Project", ProjectSchema);
  return conn; 
};


var db = mongoDatabase(connectionFactory());

const testData = {
  title: "first issue",
  description: "first issue of the project...",
  status: "open",
  priority: "low",
}

db.insertIssue(testData).then(res => console.log(res));