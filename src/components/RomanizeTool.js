import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  InputGroup,
  Alert,
  Modal,
} from "react-bootstrap";
import { transliterate } from "transliteration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faKeyboard,
  faMagic,
  faCheckCircle,
  faCopy,
  faCircleExclamation,
  faList,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const RomanizeTool = () => {
  const [inputText, setInputText] = useState("");
  const [romanizedText, setRomanizedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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
    if (!inputText.trim()) {
      setError("Vui lòng nhập văn bản để chỉnh sửa!");
      setRomanizedText("");
      setCharCount(0);
      return;
    }
    setError("");
    const result = romanizeString(inputText);
    setRomanizedText(result);
    setCharCount(result.length);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(romanizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResultChange = (e) => {
    const newText = e.target.value;
    setRomanizedText(newText);
    setCharCount(newText.length);
    setCopied(false);
  };

  const triggerReset = () => {
    setFadeOut(true);
    setTimeout(() => {
      setInputText("");
      setRomanizedText("");
      setCopied(false);
      setError("");
      setCharCount(0);
      setFadeOut(false);
    }, 300); // sync with CSS transition
  };

  return (
    <Container className="py-5">
      <div
        className="bg-white p-4 p-md-5 rounded shadow-soft mx-auto"
        style={{ maxWidth: "800px" }}
      >
        <h1 className="mb-4 text-primary">
          <FontAwesomeIcon icon={faLink} className="me-2" />
          Công cụ chỉnh sửa URL
        </h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="h5 text-dark">
              <FontAwesomeIcon icon={faKeyboard} className="me-2" />
              Nhập vào đoạn văn bản muốn chỉnh:
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập vào đây..."
                autoFocus
              />
              <Button variant="primary" type="submit">
                <FontAwesomeIcon icon={faMagic} />
              </Button>
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => setShowModal(true)}
                disabled={!inputText}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>

        {error && (
          <Alert variant="danger" className="mt-3">
            <FontAwesomeIcon icon={faCircleExclamation} className="me-2" />
            {error}
          </Alert>
        )}

        {romanizedText && !error && (
          <div className={`mt-4 ${fadeOut ? "fade-out" : ""}`}>
            <h5 className="text-success">
              <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
              Kết quả:
            </h5>
            <InputGroup>
              <Form.Control
                type="text"
                value={romanizedText}
                onChange={handleResultChange}
              />
              <Button
                variant={copied ? "success" : "outline-success"}
                onClick={handleCopy}
              >
                <FontAwesomeIcon icon={faCopy} />
              </Button>
            </InputGroup>
            <p className="mt-2 mb-0 text-muted">
              Số ký tự: <strong>{charCount}</strong>
            </p>
          </div>
        )}

        <div className="mt-5">
          <h5>
            <FontAwesomeIcon icon={faList} className="me-2" /> Ví dụ:
          </h5>
          <ul className="text-muted">
            <li>
              "Xin chào!" → <code>xin-chao</code> (8 ký tự)
            </li>
            <li>
              "Hello World!" → <code>hello-world</code> (11 ký tự)
            </li>
            <li>
              "This & That" → <code>this-that</code> (9 ký tự)
            </li>
            <li>
              "Café Olé" → <code>cafe-ole</code> (8 ký tự)
            </li>
            <li>
              "Multiple Spaces" → <code>multiple-spaces</code> (15 ký tự)
            </li>
            <li>"こんにちは" → "konnitiha" (9 ký tự)</li>
            <li>"안녕하세요" → "annyeonghaseyo" (14 ký tự)</li>
          </ul>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xoá dữ liệu đã nhập không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowModal(false);
              triggerReset();
            }}
          >
            Xác nhận reset
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RomanizeTool;
