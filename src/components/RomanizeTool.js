import React, { useState } from "react";
import { Container, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { transliterate } from "transliteration";

const RomanizeTool = () => {
  const [inputText, setInputText] = useState("");
  const [romanizedText, setRomanizedText] = useState("");
  const [copied, setCopied] = useState(false);

  // Function to romanize the string
  const romanizeString = (str) => {
    return transliterate(str)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = romanizeString(inputText);
    setRomanizedText(result);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(romanizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container className="my-5 col-lg-6 col-md-8 col-sm-10 col-12">
      <h2 className="mb-4">Công cụ chỉnh sửa URL</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nhập vào đoạn văn bản muốn chỉnh:</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập vào đây"
            />
            <Button variant="primary" type="submit">
              Biến thành URL
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>

      {romanizedText && (
        <div className="mt-3">
          <h4>Kết quả:</h4>
          <InputGroup>
            <Form.Control type="text" value={romanizedText} readOnly />
            <Button variant="outline-success" onClick={handleCopy}>
              Sao chép
            </Button>
          </InputGroup>
          {copied && (
            <Alert variant="success" className="mt-2">
              Đã sao chép!
            </Alert>
          )}
        </div>
      )}

      <div className="mt-4">
        <h5>Ví dụ:</h5>
        <ul>
          <li>"Xin chào!" → "xin-chao"</li>
          <li>"Hello World!" → "hello-world"</li>
          <li>"This & That" → "this-that"</li>
          <li>"Café Olé" → "cafe-ole"</li>
          <li>"Multiple Spaces" → "multiple-spaces"</li>
        </ul>
      </div>
    </Container>
  );
};
export default RomanizeTool;
