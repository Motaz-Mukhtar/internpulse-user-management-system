import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.DB_URL;
const DB_DATABASE = process.env.DB_DATABASE;

class MongoDBClient {
    constructor() {
        this.connected = false;

        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true  })
        .then(() => {
            this.connected = true;
        }).catch(error => {
            this.connected = false;
        });
    }

    isAlive() {
        return this.connected;
    }
}

const mongodbClient = new MongoDBClient();

export default mongodbClient;