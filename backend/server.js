require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./rountes/api');
const connection = require('./config/database');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

const http = require("http");
const exp = require('constants');
const server = http.createServer(app);

const socketIo = require("socket.io");
const fs = require("fs");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

configViewEngine(app);

const webAPI = express.Router();

app.use("/", webAPI);

app.use('/api/v1', apiRoutes);

const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("🟢 Client kết nối!");

    socket.on("frame", (blob) => {
        fs.writeFileSync("frame.jpg", blob); // Lưu frame vào file
    });

    socket.on("disconnect", () => console.log("🔴 Client ngắt kết nối!"));
});

// API cho Python lấy ảnh
app.get("/frame", (req, res) => {
    const img = fs.readFileSync("frame.jpg");
    res.contentType("image/jpeg");
    res.send(img);
});

server.listen(port, () => console.log(`🚀 WebSocket server chạy tại http://localhost:${port}`));