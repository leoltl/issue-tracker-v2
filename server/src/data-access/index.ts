import mongoDatabase from "./mongo/database";
import connectionFactory from "./mongo/models";

const MONGODB_URI = "mongodb+srv://admin:123@cluster0-yp8zg.mongodb.net/issue-tracker?retryWrites=true&w=majority";

const mongoDB = mongoDatabase(connectionFactory());

export default mongoDB;