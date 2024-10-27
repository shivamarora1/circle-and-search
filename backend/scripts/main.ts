import * as fs from 'fs';
import csv from 'csv-parser';
import axios from 'axios';
import { base64ToEmbeddings } from '../api/utils';
import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime';
import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node'
import dotenv from "dotenv";
dotenv.config();


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

async function readCSV(filePath): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const results: any[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}
async function imageUrlToBase64(imageUrl: string): Promise<string> {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        // const mimeType = response.headers['content-type'];
        // return `data:${mimeType};base64,${base64Image}`;
        return base64Image;
    } catch (error) {
        throw new Error(`Failed to fetch image from URL: ${error.message}`);
    }
}

(async () => {
    try {
        const address = process.env.MILVUS_ENDPOINT || "";
        const token = process.env.MILVUS_TOKEN;

        const collectionName = "amazon_products";
        const client = new MilvusClient({ address, token });

        const hasCollection = await client.hasCollection({ collection_name: collectionName })
        if (!hasCollection.value) {
            console.log(`Collection ${collectionName} does not exists. Creating one with fields.`)
            await createCollection(client, collectionName)
        } else {
            console.log(`Collection ${collectionName} already exists.`)
        }

        const csvPath = "scripts/Amazon Fashion.csv";
        let csvLst = await readCSV(csvPath);
        console.log(`found ${csvLst.length} elements in list`);

        let newList: Array<any> = [];
        for (let i in csvLst) {
            const ele = csvLst[i];
            delete ele["no_of_ratings"];

            try {
                const imgBase64 = await imageUrlToBase64(ele["image"]);
                ele["image_vector"] = await base64ToEmbeddings(bedrockClient, imgBase64);
                ele["id"] = i;
                newList.push(ele);
                console.log(`processed ${i} element...`);
            } catch (error) {
                console.log(`error in processing:`, ele);
                console.error(error);
            }
        }

        const res = await client.insert({ collection_name: collectionName, data: newList });
        console.log(res.insert_cnt);
        return

    } catch (error) {
        console.error(error);
    }
})();

async function createCollection(client: MilvusClient, collectionName: string) {
    const fields = [
        {
            name: "id",
            data_type: DataType.Int64,
            is_primary_key: true,
            auto_id: true
        },
        {
            name: "image_vector",
            data_type: DataType.FloatVector,
            dim: 1024
        },
        {
            name: "name",
            data_type: DataType.VarChar,
            max_length: 50000,
        },
        {
            name: "main_category",
            data_type: DataType.VarChar,
            max_length: 50000,
        },
        {
            name: "sub_category",
            data_type: DataType.VarChar,
            max_length: 50000,
        },
        {
            name: "image",
            data_type: DataType.VarChar,
            max_length: 50000,
        },
        {
            name: "link",
            data_type: DataType.VarChar,
            max_length: 50000,
        },
        {
            name: "ratings",
            data_type: DataType.VarChar,
            max_length: 10,
        },
        {
            name: "discount_price",
            data_type: DataType.VarChar,
            max_length: 50,
        },
        {
            name: "actual_price",
            data_type: DataType.VarChar,
            max_length: 50,
        },
    ];

    const index_params = [{
        field_name: "image_vector",
        index_type: "IVF_FLAT",
        metric_type: "L2",
        params: { nlist: 1024 }
    }];

    const res = await client.createCollection({
        collection_name: collectionName,
        fields: fields,
        index_params: index_params,
    });
    console.log(res.error_code);
}