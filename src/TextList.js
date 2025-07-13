import { useEffect, useState } from "react";
import { Container, Input, Table,Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const TextList = () => {
  const [texts, setTexts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/texts")
      .then((res) => res.json())
      .then((data) => setTexts(data))
      .catch((err) => console.error("Veri alınamadı:", err));
  }, []);

  const manipulateText = (text) => {
    const countMap = {};
    for (const char of text) {
      countMap[char] = (countMap[char] || 0) + 1;
    }
    let result = "";
    const added = new Set();
    for (const char of text) {
      if (!added.has(char)) {
        result += char + countMap[char];
        added.add(char);
      }
    }
    return result;
  };

  const filteredTexts = texts
    .filter((item) =>
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aText = manipulateText(a.text);
      const bText = manipulateText(b.text);
      return sortAsc ? aText.localeCompare(bText) : bText.localeCompare(aText);
    });

  return (
    <Container className="mt-5">
      <Button color="secondary" className="mb-3" onClick={() => navigate("/")}>
        ← Geri Dön
      </Button>
      <h3 className="mb-3">Veritabanındaki Metinler</h3>

      <Input
        type="text"
        placeholder="Ara..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => setSortAsc(!sortAsc)}
            >
              Manipüle Metin {sortAsc ? "▲" : "▼"}
            </th>
            <th>Orijinal Metin</th>
          </tr>
        </thead>
        <tbody>
          {filteredTexts.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{manipulateText(item.text)}</td>
              <td>{item.text}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TextList;
