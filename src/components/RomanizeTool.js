import React, { useState } from "react";
import { Container, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { transliterate } from "transliteration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faKeyboard,
  faMagic,
  faCheckCircle,
  faCopy,
  faCheck,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const RomanizeTool = () => {
  const [inputText, setInputText] = useState("");
  const [romanizedText, setRomanizedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0); // Add state for character count

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
    // Check if inputText is empty or only whitespace
    if (!inputText.trim()) {
      setError("Vui lòng nhập văn bản để chỉnh sửa!");
      setRomanizedText("");
      setCharCount(0); // Reset character count on error
      return;
    }
    // Clear error and process input if not empty
    setError("");
    const result = romanizeString(inputText);
    setRomanizedText(result);
    setCharCount(result.length); // Set character count based on result length
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(romanizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container className="my-5 col-lg-6 col-md-8 col-sm-10 col-12">
      <h2 className="mb-4">
        <FontAwesomeIcon icon={faLink} className="me-2" /> Công cụ chỉnh sửa URL
      </h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            <FontAwesomeIcon icon={faKeyboard} className="me-2" /> Nhập vào đoạn
            văn bản muốn chỉnh:
          </Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập vào đây"
              autoFocus
            />
            <Button variant="primary" type="submit">
              <FontAwesomeIcon icon={faMagic} className="me-2" /> Biến thành URL
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {romanizedText && !error && (
        <div className="mt-3">
          <h4>
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" /> Kết quả:
          </h4>
          <InputGroup>
            <Form.Control type="text" value={romanizedText} readOnly />
            <Button variant="outline-success" onClick={handleCopy}>
              <FontAwesomeIcon icon={faCopy} className="me-2" /> Sao chép
            </Button>
          </InputGroup>
          <p className="mt-2">
            Số ký tự: <strong>{charCount}</strong>
          </p>
          {copied && (
            <Alert variant="success" className="mt-2">
              <FontAwesomeIcon icon={faCheck} className="me-2" /> Đã sao chép!
            </Alert>
          )}
        </div>
      )}

      <div className="mt-4">
        <h5>
          <FontAwesomeIcon icon={faList} className="me-2" /> Ví dụ:
        </h5>
        <ul>
          <li>"Xin chào!" → "xin-chao" (8 ký tự)</li>
          <li>"Hello World!" → "hello-world" (11 ký tự)</li>
          <li>"This & That" → "this-that" (9 ký tự)</li>
          <li>"Café Olé" → "cafe-ole" (8 ký tự)</li>
          <li>"Multiple Spaces" → "multiple-spaces" (15 ký tự)</li>
        </ul>
      </div>
    </Container>
  );
};

export default RomanizeTool;
