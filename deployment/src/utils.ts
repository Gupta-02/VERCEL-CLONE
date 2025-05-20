import { spawn, exec } from "child_process";
import path from "path";

export function buildProject(id: string) {
  return new Promise((resolve, reject) => {
    try {
      const projectPath = path.join(__dirname, `output\\${id}`);
      console.log(`Building project at: ${projectPath}`);

      console.log("Installing dependencies...");
      const installProcess = exec(
        `cd "${projectPath}" && npm install --no-fund --no-audit --loglevel=error`,
        {
          maxBuffer: 1024 * 1024 * 10, 
        }
      );

      installProcess.stdout?.on("data", function (data) {
        console.log("npm install stdout: " + data);
      });

      installProcess.stderr?.on("data", function (data) {
        console.log("npm install stderr: " + data);
      });

      installProcess.on("close", function (code) {
        if (code !== 0) {
          console.log(
            `npm install exited with code ${code}, but continuing with build...`
          );
        }

        console.log("Building project...");
        const buildProcess = exec(`cd "${projectPath}" && npm run build`, {
          maxBuffer: 1024 * 1024 * 10, 
        });

        buildProcess.stdout?.on("data", function (data) {
          console.log("npm build stdout: " + data);
        });

        buildProcess.stderr?.on("data", function (data) {
          console.log("npm build stderr: " + data);
        });

        buildProcess.on("close", function (buildCode) {
          if (buildCode !== 0) {
            console.log(`Build process exited with code ${buildCode}`);
          } else {
            console.log("Build completed successfully");
          }
          resolve("");
        });

        buildProcess.on("error", function (err) {
          console.error("Error during build:", err);
          resolve("");
        });
      });

      installProcess.on("error", function (err) {
        console.error("Error during npm install:", err);
        console.log("Attempting to build despite install error...");

        const buildProcess = exec(`cd "${projectPath}" && npm run build`, {
          maxBuffer: 1024 * 1024 * 10,
        });

        buildProcess.on("close", function () {
          resolve("");
        });

        buildProcess.on("error", function () {
          resolve("");
        });
      });
    } catch (error) {
      console.error("Exception in buildProject:", error);
      resolve("");
    }
  });
}
