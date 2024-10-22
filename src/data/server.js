const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const secretKey = 'your-secret-key'; // Zastąp silniejszym kluczem w produkcji

app.use(bodyParser.json());

// Ścieżka do pliku users.json
const usersFilePath = path.join(__dirname, 'data', 'users.json');

// Funkcja do odczytywania użytkowników z pliku users.json
const getUsers = async () => {
    try {
        const users = await fs.readJson(usersFilePath);
        return users;
    } catch (err) {
        console.error('Error reading users.json', err);
        return [];
    }
};

// Endpoint do logowania
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Pobieranie użytkowników z pliku
    const users = await getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Generowanie tokenu JWT
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Middleware do weryfikacji tokenu JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Failed to authenticate token.' });
        }

        // Token jest poprawny, kontynuuj żądanie
        req.username = decoded.username;
        next();
    });
};

// Przykładowy chroniony endpoint - po weryfikacji tokenu
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: `Hello, ${req.username}! You have access.` });
});

// Uruchamianie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
