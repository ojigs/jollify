import AdminJS from "adminjs";
import express from "express";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import uploadFeature from "@adminjs/upload";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import { Artiste } from "./models/Artiste.js";
import { Album } from "./models/Album.js";
import { Song } from "./models/Song.js";
import { User } from "./models/User.js";
import { Comment } from "./models/Comment.js";
import { Playlist } from "./models/Playlist.js";
import { componentLoader } from "./component.js";
import mongoose from "mongoose";
dotenv.config({ path: "./config/.env" });

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucket = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_S3_REGION;

const s3 = new AWS.S3({ region, accessKeyId, secretAccessKey });

const navigation = (name, icon) => {
  return { name, icon };
};

const adminOptions = {
  resources: [
    User,
    Comment,
    Playlist,
    {
      resource: Artiste,
      options: {
        navigation: navigation("Artiste", "User"),
      },
    },
    {
      resource: Album,
      options: {
        navigation: navigation("Album", "Folder"),
      },
    },
    {
      resource: Song,
      options: {
        navigation: navigation("Song", "Music"),
        properties: {
          audioURL: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
          audioFile: {
            isVisible: { edit: true, show: false, list: false, filter: false },
            type: "file",
            label: "Audio File",
            isRequired: true,
            provider: {
              awsS3: { bucket, region, accessKeyId, secretAccessKey },
            },
          },
          lyrics: {
            type: "richtext",
          },
        },
        // actions: {
        //   new: {
        //     before: async (request) => {
        //       const { audioFile } = request.payload;

        //       if (audioFile) {
        //         const params = {
        //           Bucket: bucket,
        //           Key: `${Date.now()}-${audioFile.originalName}`,
        //           Body: audioFile.buffer,
        //         };

        //         const { Location } = await s3.upload(params).promise();

        //         request.payload.audioUrl = Location;
        //       }

        //       return request;
        //     },
        //   },
        // },
      },
      features: [
        uploadFeature({
          componentLoader,
          properties: {
            file: "audioFile",
            key: "audioURL",
            bucket,
            region,
            mimeType: "audio/mpeg",
          },
          // validation: {
          //   mimeTypes: "audio/mpeg",
          // },
          provider: {
            aws: { bucket, region, accessKeyId, secretAccessKey, expires: 0 },
          },
        }),
      ],
    },
  ],
};

const start = async () => {
  const app = express();
  const mongooseDB = await mongoose.connect(process.env.DB_STRING);
  console.log(`MongoDB connected: ${mongooseDB.connection.host}`);

  const admin = new AdminJS({
    ...adminOptions,
    componentLoader,
    databases: [mongooseDB],
  });
  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  admin.watch();

  app.listen(process.env.PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${process.env.PORT}${admin.options.rootPath}`
    );
  });
};

start();
