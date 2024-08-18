import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors())
app.use(router)


const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://aleajda:ibVtGQ5aYE1tbNwi@cluster0.sy5sl.mongodb.net/linkShorter?retryWrites=true&w=majority&appName=linkShorter')
        app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});
    }catch(err) {
        console.error(err);
    }
}

start()