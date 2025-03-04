require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./rountes/api');
const connection = require('./config/database');
const OpenAI = require("openai")

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

const http = require("http");
const server = http.createServer(app);

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

configViewEngine(app);

const webAPI = express.Router();

app.use("/", webAPI);

app.use('/', apiRoutes);

const API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: API_KEY
  });

  
  // Endpoint xử lý chat
app.post("/api/chat", async (req, res) => {
    let promt = "'" + req.body.messages+"' , you are an English teacher for Vietnamese people, your name is Enggram";
    if(req.body.level ==="basic") promt += ", please answer this question simply amd sort.";
    else if(req.body.level ==="high") promt += ", please respond to this question with high level.";
    else if(req.body.level ==="ielts") promt += ", please respond to this question for your students to learn IELTS.";
    else if(req.body.level ==="toeic") promt += ", please respond to this question so your students can learn toeic.";
    if(req.body.lang === "en") promt += " Please response by English.";
    else if(req.body.lang === "vi") promt += " Please answer by english and explain by vietnamese";
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: promt}],
            model: "gpt-4o-mini",
        });

        res.json(completion);
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

app.post("/api/trans", async (req, res) => {
    let promt = ""
    if(req.body.lang ==="en") promt = "'"+ req.body.messages+"'" + ", rewrite the sentence in English if it is grammatically incorrect or translate it into English if it is written in Vietnamese. And just type it.";
    if(req.body.lang ==="vi") promt = "'"+ req.body.messages+"'" + ", translate it to Vietnamese, and just type Vietnamese tense"
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: promt}],
            model: "gpt-4o-mini",
        });

        res.json(completion);
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

connection();
server.listen(port, () => console.log(`🚀 WebSocket server chạy tại http://localhost:${port}`));