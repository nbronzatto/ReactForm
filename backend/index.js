const  connectToDatabase = require('./database');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Habilitar CORS
app.use(cors());


// Servir arquivos estáticos da pasta dist gerada pelo Vite
app.use(express.static(path.join(__dirname, '../front/dist')));


// Async Function to connection db
async function getItems() {
    const collection = await connectToDatabase();
    const documents = await collection.find().toArray();
    return documents;
}


// Rota para a API
app.get('/api', async (req, res) => {
    try {
        const items = await getItems();
        res.json(items);
    } catch (error) {
        console.error("Deu ruim em recuperar dados:", error);
        res.status(500).json({ message: "Deu ruim em recuperar dados" });
    }
});


// Rota para servir o index.html para todas as outras requisições (front-end React)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/dist', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});