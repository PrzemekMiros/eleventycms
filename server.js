const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Ustawienia middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key', // Zmień na silny klucz
    resave: false,
    saveUninitialized: true,
}));

// Funkcja do wczytywania użytkowników z pliku
function loadUsers() {
    const data = fs.readFileSync(path.join(__dirname, 'users.json'));
    return JSON.parse(data);
}

// Endpoint do logowania
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const token = jwt.sign({ username: user.username }, 'your_jwt_secret_key', { expiresIn: '1h' });
        req.session.token = token; // Przechowuj token w sesji
        res.send('Logged in successfully');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Endpoint do wylogowania
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out successfully');
});

// Middleware do ochrony tras
function authenticateToken(req, res, next) {
    const token = req.session.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'your_jwt_secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Przykładowa zastrzeżona trasa
app.get('/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route');
});

// Ustawienia statycznych plików
app.use(express.static(path.join(__dirname, 'public')));

// Start serwera
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
