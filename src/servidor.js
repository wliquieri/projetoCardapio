import express from "express";
import fileUpload from "express-fileupload";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import "./db/dbConnect.js"

const app = express();
const porta =  process.env.porta || 8080;

app.use(fileUpload())

app.post('/upload', async (req, res) => {
  if (!req.files || !req.files.imagem) {
    return res.status(400).send('Nenhuma imagem selecionada.');
  }

  const imagemFile = req.files.imagem;
  const imagemBinario = imagemFile.data.toString('binary');

  // Salve o binário da imagem no MongoDB (próximo passo)

  res.status(200).send('Imagem recebida com sucesso.');
});


const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "public");
app.use(express.static(diretorioPublico));

const servidorHttp = http.createServer(app);

servidorHttp.listen(porta, () => 
  console.log(`Servidor escutando na porta ${porta}`));

const io = new Server(servidorHttp);

export default io;