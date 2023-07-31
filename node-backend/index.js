const dbConnect = require("./config/database");

const startApplication = async () => {
  try {
    await dbConnect();
    const app = require("./app.js");

    const port = Number(process.env.PORT || 8000);
    app.set("port", port);

    const server = require("http").createServer(app);

    server.listen(port);
    server.on("listening", () => {
      console.log("Server Running on Port  -->  " + port);
    });
  } catch (err) {
    console.log(err);
  }
};

startApplication();
