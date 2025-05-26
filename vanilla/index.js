const { app, BrowserWindow } = require("electron");
const path = require("path");
const server = require("./server");
// if (process.env.NODE_ENV === "development") {
//   console.log("Development mode detected -- enabling hot reload");
//   try {
//     require("electron-reloader")(module, {
//       debug: true,
//       watchRenderer: true, // it watches the render
//     });
//     console.log("Hot reload ENABLED ✓");
//   } catch (err) {
//     console.error("Hot reload error:", err);
//   }
// }

async function createWindow() {
  const startServer = await server();
  let mainWindow = new BrowserWindow({
    width: 800, // Initial width (can be anything, will be adjusted)
    height: 600, // Initial height (can be anything, will be adjusted)
    show: false, // Don't show until ready
    useContentSize: true, // Make width/height refer to the content area
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // For contextBridge
      nodeIntegration: false, // Best practice for security
      contextIsolation: true, // Best practice for security
    },
  });

  // mainWindow.loadFile("index.html");
  mainWindow.loadURL(startServer);
  mainWindow.webContents.openDevTools();

  mainWindow.once("ready-to-show", async () => {
    
    // const { width, height } = await mainWindow.webContents.executeJavaScript(
    //   (() => {
    //     // You might want to get the size of a specific container if your body
    //     // isn't exactly what you want to measure.
    //     // Example: If you have a #app div:
    //     const appDiv = document.querySelector("p5Canvas");
    //     if (appDiv) {
    //       return { width: appDiv.offsetWidth, height: appDiv.offsetHeight };
    //     }
    //   })()
    // );

    // mainWindow.setSize(width, height);

    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
