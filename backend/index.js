const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'studycase',
  password: 'studycase123',
  database: 'study_case'
});

db.connect((err) => {
  if (err) {
    console.error('Veritabanına bağlanırken hata oluştu:', err);
    return;
  }
  console.log('Veritabanına başarıyla bağlanıldı.');
});

app.post('/save', (req, res) => {
  const { texts } = req.body;

  if (!texts || !Array.isArray(texts) || texts.length === 0) {
    return res.status(400).json({ error: 'Geçersiz metinler.' });
  }

  const query = 'INSERT INTO texts (text) VALUES ?';
  const values = texts.map(text => [text]);

  db.query(query, [values], (err, results) => {
    if (err) {
      console.error('Veritabanına kayıt sırasında hata oluştu:', err);
      return res.status(500).json({ error: 'Veritabanına kayıt sırasında hata oluştu.' });
    }
    res.status(200).json({ message: 'Metinler başarıyla kaydedildi.' });
  });
});

app.get('/texts', (req, res) => {
  const query = 'SELECT * FROM texts ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Veritabanından metinler alınırken hata oluştu:', err);
      return res.status(500).json({ error: 'Veri alınamadı.' });
    }
    res.status(200).json(results);
  });
});


app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
