import dotenv from "dotenv";
dotenv.config();
import {
    BedrockRuntimeClient,
    InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

export const base64ToEmbeddings = async (client: BedrockRuntimeClient, imageBase64: string): Promise<any> => {


    const payload = {
        inputImage: imageBase64,
    };

    const modelId = "amazon.titan-embed-image-v1";
    const command = new InvokeModelCommand({
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(payload),
        modelId,
    });

    const apiResponse = await client.send(command);
    const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
    const responseBody = JSON.parse(decodedResponseBody);
    return responseBody["embedding"];
};
