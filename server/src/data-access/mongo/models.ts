import mongoose from "mongoose";
import { UserSchema, IssueSchema, ProjectSchema } from "./schema";

export default function connectionFactory() {
  const conn = mongoose.createConnection(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
  conn.model('User', UserSchema);
  conn.model("Issue", IssueSchema);
  conn.model("Project", ProjectSchema);
  return conn; 
};