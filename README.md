# Study Case 

## Kullanılan Teknolojiler

- **Frontend:** React, Reactstrap, React Router DOM  
- **Backend:** Node.js (Express.js)  
- **Veritabanı:** MySQL  
- **Stil:** Bootstrap 5

---

## Kurulum Adımları

### 1. Veritabanı Oluşturma

```sql
CREATE DATABASE study_case;

USE study_case;

CREATE TABLE texts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Veritabanı Bağlantı Bilgileri (`backend/index.js` içinde)

```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'studycase',
  password: 'studycase123',
  database: 'study_case'
});
```

---

##  Uygulamanın Çalıştırılması

### 3. Backend'i Başlat

```bash
cd study-case
cd backend
node index.js
```

### 4. Frontend'i Başlat

```bash
cd study-case
npm install
npm start
```

---

##  Proje Yapısı

```
study-case/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── ...
├── public/
├── src/
│   ├── App.js
│   ├── MainApp.js
│   ├── TextList.js
│   ├── ...
├── README.md
├── package.json
```


