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
import {Expo } from "expo-server-sdk";
import { haversine } from "./utils/utils.js";

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
  const expo = new Expo();
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

let users = [];
let studentLocationUpdates = [];
let teacherLocationUpdates = [];
let disconnectedUsers = [];

setInterval(() => {
  const currentTime = Date.now();
  if (studentLocationUpdates.length > 0) {
  const inactiveStudents = studentLocationUpdates.filter((student) => {
    const lastUpdateTime = new Date(student.lastUpdateTime).getTime();
    const timeElapsed = (currentTime - lastUpdateTime) / (1000 * 60); // Convert to minutes
    return timeElapsed >= 10;
  });
  if (inactiveStudents.length > 0) {
      for (let i = 0; i < inactiveStudents.length; i++) {
        const student = inactiveStudents[i];
        const teacher = users.find((user) => user.userId === student.teacherId);
        if (teacher !== undefined) {
          const teacherPushToken = teacher.pushToken;
          if (expo.isExpoPushToken(teacherPushToken)) {
            expo.sendPushNotificationsAsync([
              {
                to: teacherPushToken,
                sound: "default",
                title: "Student is inactive",
                body: `${student.first_name} ${student.last_name} is inactive for more than 10 minutes`,
                data: {}

          }, {
            to:student.pushToken,
            sound: "default",
            title: "You are inactive",
            body: `You are inactive for more than 10 minutes`,
            data: {
            }
          }
        ]);
        }
      }
  }
}
  }
}, 5 * 60 * 1000); // Run every 5 minutes

setInterval(() => {
  const currentTime = Date.now();
  for (let i = 0; i < studentLocationUpdates.length; i++) {
    const student = studentLocationUpdates[i];
    const teacher = users.find((user) => user.userId === student.teacherId);
    if (teacher !== undefined) {
      const distance = haversine(student.latitude, student.longitude, teacher.latitude, teacher.longitude);
      if (distance > 5) {
        const teacherPushToken = teacher.pushToken;
        if (expo.isExpoPushToken(teacherPushToken)) {
          expo.sendPushNotificationsAsync([
            {
              to: teacherPushToken,
              sound: "default",
              title: "Student is out of range",
              body: `${student.first_name} ${student.last_name} is out of range`,
              data: {}
            },
            {
              to:student.pushToken,
              sound: "default",
              title: "You are out of range",
              body: `You are out of range`,
              data: {
              }
            }
          ]);
        }
      }
    }
  }
}, 15 * 60 * 1000); // Run every 15 minutes



io.on("connection", (socket) => {
    console.log(`a user ${socket.handshake.auth.userId} connected`);
    const socketUser = socket.handshake.auth;
    socketUser.socketId = socket.id;
    users.push(socketUser);
    console.log(users);
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("studentLocationUpdated", (data) => {
      const student = studentLocationUpdates.find((student) => student.userId === data.userId);
      if (student !== undefined) {
        studentLocationUpdates = [...studentLocationUpdates.filter((student) => student.userId !== data.userId), data]
      }
      else {
        studentLocationUpdates.push(data);
      }

    });

    socket.on("teacherLocationUpdated", (data) => {
      const teacher = teacherLocationUpdates.find((teacher) => teacher.userId === data.userId);
      if (teacher !== undefined) {
        teacherLocationUpdates = [...teacherLocationUpdates.filter((teacher) => teacher.userId !== data.userId), data]
      }
      else {
        teacherLocationUpdates.push(data);
      }
    });

    socket.on("showLocation", (msg) => {
      console.log("message: " + msg);
    });

    socket.on("startCheckingStudents", (msg) => {
      console.log("startCheckingStudents: " + msg);
      socket.broadcast.emit("startChecklist")
  });

  socket.on("acceptedChecklist", (msg) => {
    try {
      const teacherId = users.find((user) => user.userId === msg.teacher_id).socketId;
      
      io.to(teacherId).emit("studentAcceptedChecklist", msg)
      
    }
    catch(err){
      console.log(err)
    }
  });
    socket.on("alertTeacher", (msg) => {
      console.log("alertTeacher: " + JSON.stringify(msg));
      try{
        const teacherId = users.find((user) => user.userId === msg.teacherId).socketId;
      
        io.to(teacherId).emit("alertTeacher", msg)
        socket.emit("teacherAlerted")
      }
      catch(err){
        socket.emit("teacherAlerted", {error: "Teacher is not connected"})
      }
     
});
socket.on("disconnect", () => {

  users = users.filter((user) => user.socketId !== socket.id);
});
});

app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
};

start();

//TripSync
