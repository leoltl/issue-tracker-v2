import mongoDatabase from "./mongo/database";
import connectionFactory from "./mongo/models";

const mongoDB = mongoDatabase(connectionFactory());

export default mongoDB;