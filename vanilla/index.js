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
    width: 800, 
    height: 600, 
    show: true, // not showing until ready
    useContentSize: true, 
    webPreferences: {
      nodeIntegration: false, // Best practice for security
    },
  });

  // mainWindow.loadFile("index.html");
  mainWindow.loadURL(startServer);
  mainWindow.webContents.openDevTools();

  mainWindow.once("ready-to-show", async () => {
    
    // const { width, height } = await mainWindow.webContents.executeJavaScript(
    //   (() => {
    //     //  Or some king of Resized observer syncronusly get fit with window
    //     // To get height and width of cava created 
    //     const appDiv = document.getElementById("defaultCanvas0"); // ReferenceError: document is not defined
    //     if (appDiv) {
    //       return { width: appDiv.offsetWidthh, height: appDiv.offsetHeight };
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
