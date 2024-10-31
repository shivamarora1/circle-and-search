import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { base64ToEmbeddings } from "./utils";
import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";
import multer from "multer";
import axios from "axios";

// * initializing required clients
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION || "";

const bedrockClient = new BedrockRuntimeClient({
  region: AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const address = process.env.MILVUS_ENDPOINT || "";
const token = process.env.MILVUS_TOKEN;
const collectionName = "amazon_products";
// *

const app = express();
const port = process.env.PORT;
const corsOptions = {
  origin: process.env.FRONTEND_URL,
};

const upload = multer();

app.use(express.json());
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/result", upload.none(), async (req, res) => {
  console.log(req.body);
  const data = req.body;

  if (!data.base64) {
    res.status(400).json("empty base64 string.");
    return;
  }
  try {
    const base64Data = data.base64.split(",")[1];
    const embeddings = await base64ToEmbeddings(bedrockClient, base64Data);

    const postData = {
      "collectionName": collectionName,
      "data": [embeddings],
      "annsField": "image_vector",
      "limit": 20,
      "outputFields": [
        "name",
        "discount_price",
        "actual_price",
        "main_category",
        "sub_category",
        "link",
        "image",
        "ratings",
      ]
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const milvusResp = await axios.post(`${address}/v2/vectordb/entities/search`, postData, { headers })
    const fetchedResults: Array<any> = milvusResp.data.data

    const uniqueKeys = new Map();
    fetchedResults.forEach((resItem) => {
      uniqueKeys.set(resItem["image"], resItem);
    });
    const uniqueValues = Array.from(uniqueKeys.values());

    res.status(200).json( uniqueValues );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, pls try again later." });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
