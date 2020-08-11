import mongoose from "mongoose";
// const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  name: String,
  username: String,
  hashedPassword: String,
  email: String,
  role: String,
});

export const IssueSchema = new Schema({
  title: String,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  status: String,
  priority: String,
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now()},
});

export const ProjectSchema = new Schema({
  name: String,
  issues: [{ type: Schema.Types.ObjectId, ref: "Issue" }],
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// module.exports = {
//   UserSchema,
//   IssueSchema,
//   ProjectSchema,
// }