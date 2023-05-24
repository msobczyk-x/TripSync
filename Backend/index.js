import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import AdminJs from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import Student from "./models/studentModel.js";
import Teacher from "./models/teacherModel.js";
import SchoolTrip from "./models/tripModel.js";
import {Server } from "socket.io";
import http from "http";

AdminJs.registerAdapter(
    {
        Resource: AdminJSMongoose.Resource,
        Database: AdminJSMongoose.Database,
    }
);

const start = async () => {
  dotenv.config();
  const app = express();
  const server = http.createServer(app);
  const io = new Server({
    cors: {
      origin: "http://localhost:19000",
      
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 *1000,
    },
  });
  io.listen(4000)

  app.options("*", cors({ origin: 'http://localhost:19000', optionsSuccessStatus: 200 }));
  
  app.use(cors({ origin: "http://localhost:19000", optionsSuccessStatus: 200 }));

  const mongoString = process.env.DATABASE_URL;
  app.use(express.json());
  app.use("/api", routes);

  const PORT = process.env.PORT || 3000;

 
  app.use('/uploads', express.static('uploads'));
  mongoose.connect(mongoString);
  const db = mongoose.connection;

  db.on("error", (error) => console.error(error));

  db.once("connected", () => console.log("Connected to Database"));

  const admin = new AdminJs({
    resources: [Student, Teacher, SchoolTrip],

  });
const adminRouter = AdminJSExpress.buildRouter(admin);
app.use(admin.options.rootPath, adminRouter);
  
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("showLocation", (msg) => {
      console.log("message: " + msg);
    });

    socket.on("startCheckingStudents", (msg) => {
      console.log("startCheckingStudents: " + msg);
      socket.broadcast.emit("startChecklist")
  });

  socket.on("acceptedChecklist", (msg) => {
    console.log("acceptedChecklist: " + msg);
    
});
});


app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
};

start();

//TripSync
