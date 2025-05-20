import { downloadS3Folder } from "./aws";

async function testDownload() {
  try {
    console.log("Starting test download for ID: 95atn");
    await downloadS3Folder("output\\95atn");
    console.log("Test download completed");
  } catch (error) {
    console.error("Test download failed:", error);
  }
}

testDownload();
