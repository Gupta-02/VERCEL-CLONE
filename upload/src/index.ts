import express from "express";
import cors from "cors";
import { generate } from "./utils";
import simpleGit from "simple-git";
import { getAllFiles } from "./file";
import * as path from "path";
import { uploadFile } from "./aws";
import { createClient } from "redis";
const publisher = createClient();
publisher.connect();

const subscriber = createClient();
subscriber.connect();

const app = express();
app.use(cors());
app.use(express.json());
// uploadFile(
//   "aashish/package.json",
//   path.join(__dirname, "output", "ah3q2", "package.json")
// );

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;
  console.log("Received repo URL:", repoUrl);
  const id = generate();
  await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));

  const files = getAllFiles(path.join(__dirname, `output/${id}`));
  // console.log(files);


  // /Users/aashish/VercelClone/dist/output/as123/src/app.tsx
  // output/as123/app.tsx   after slicing
  const uploadPromises = files.map(async (file) => 
    await uploadFile(file.slice(__dirname.length + 1), file)
  );

  await Promise.all(uploadPromises);

  publisher.lPush("build-queue", id);

  publisher.hSet("status",id,  "uploaded");
  
  res.json({
    id: id,
  });
});


app.get("/status", async (req ,res)=> {
  const id = req.query.id;
  const response = await subscriber.hGet("status", id as string);
  res.json({
    status: response
  })
})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});