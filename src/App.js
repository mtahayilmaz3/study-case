import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

function App() {
  const [number, setNumber] = useState("");
  const [texts, setTexts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const sayi = parseInt(number);
    if (isNaN(sayi) || sayi <= 0) {
      alert("Lütfen geçerli bir sayı giriniz.");
      return;
    }
    const newTexts = [];
    for (let i = 0; i < 100; i++) {
      newTexts.push(generateRandomText(sayi));
    }
    setTexts(newTexts);
    setShowResult(true);

    fetch("http://localhost:3001/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texts: newTexts }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Veritabanına kayıt sırasında hata oluştu.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  };
  const letters = "abcçdefgğhıijklmnoöprsştuüvyz";

  const generateRandomText = (length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters[randomIndex];
    }
    return result;
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6" className="text-center">
          <Input
            type="number"
            placeholder="Bir sayı giriniz"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="mb-3"
          />
          <Button color="primary" onClick={handleSubmit}>
            Gönder
          </Button>
          <Button
            color="primary"
            className="mt-3, ms-3"
            onClick={() => navigate("/liste")}
          >
            Listeyi Görüntüle
          </Button>
        </Col>
      </Row>

      {showResult && (
        <>
          <Row className="mt-4 justify-content-center">
            <Col md="10">
              <div
                className="p-3 border rounded bg-light"
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                <div className="d-flex flex-wrap gap-2">
                  {texts.map((text, index) => (
                    <span
                      key={index}
                      className="badge bg-secondary"
                      style={{ fontSize: "1rem" }}
                    >
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mt-4 justify-content-center">
            <Col md="10">
              <div className="p-4 bg-white border rounded shadow-sm text-center">
                <h5 className="text-muted mb-0">
                  Bu metinler her biri {number} harf uzunluğunda, toplam 100
                  adet rastgele oluşturulmuştur ve dataset üzerinde kullanılmak
                  üzere kaydedilmiştir.
                </h5>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default App;
