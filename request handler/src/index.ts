import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(/.*/, async (req, res) => {
  // id.localhost
  const host = req.hostname;
  console.log("Hostname:", host);
  console.log("Host header:", req.headers.host);

  const id = host.split(".")[0];
  const filePath = req.path;

  try {
    let path = filePath;
    if (path === "/") {
      path = "/index.html"; 
    }
    const formattedPath = path.replace(/\//g, "\\");
    const s3Key = `dist\\${id}\\${formattedPath.substring(1)}`;
    console.log("S3 Key:", s3Key);

    const contents = await s3
      .getObject({
        Bucket: "vercelclone17405",
        Key: s3Key,
      })
      .promise();

     const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);
    res.send(contents.Body);
  } catch (error) {
    console.error("Error fetching from S3:", error);
    res.status(404).send("File not found");
  }
});

app.listen(3001, () => {
  console.log("server running at http://localhost:3001");
});
