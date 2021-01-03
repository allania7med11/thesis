const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";

const app = require("express")();
app.get("/api", (req, res) => {
  res.send("Hello World!");
});
const { Nuxt, Builder } = require('nuxt')
// We instantiate Nuxt with the options
const config = require('../nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
io.on("connection", socket => {
  console.log("made socket connection", socket.id);

  // Handle chat event
  socket.on("chat", function(data) {
    // console.log(data);
    io.sockets.emit("chat", data);
  });

  // Handle typing event
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
