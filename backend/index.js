const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToDatabase = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Habilitar CORS
app.use(cors());
  

// Configurar bodyParser para lidar com JSON
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta dist gerada pelo Vite
app.use(express.static(path.join(__dirname, '../front/dist')));

// Rota para receber dados do formulário via POST
app.post('/api/submit', async (req, res) => {
    try {
        console.log('Dados recebidos:', req.body); // Adicione um log para ver os dados recebidos
        const formData = req.body;
        const collection = await connectToDatabase();
        const result = await collection.insertOne(formData);
        res.status(201).json({ message: 'Dados enviados com sucesso!', id: result.insertedId });
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
        res.status(500).json({ message: 'Erro ao salvar dados' });
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
