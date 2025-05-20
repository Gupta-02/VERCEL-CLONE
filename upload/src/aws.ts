import { S3 } from 'aws-sdk';
import fs from "fs";

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})


// fileName => output/as123/src/App.tsx
// LocalFilePath => /Users/aashish/VercelClone/dist/output/as123/src/App.tsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercelclone17405",
        Key: fileName
    }).promise();
    // console.log(response);
}