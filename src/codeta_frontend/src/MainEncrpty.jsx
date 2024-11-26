import React, { useState } from "react";
import { encryptMessage, decryptMessage } from "./Encryption/Encrption";

function QuantumEncryptionDemo() {
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState(null);
  const [decryptedMessage, setDecryptedMessage] = useState(null);

  const receiverPublicKey = "rWkV/KtnBgQXkKq9HkZbvd4lKqLVRnS0fGiCibB3H9E=";

  const handleEncrypt = () => {
    const sanitizedMessage = message.trim();
    if (!sanitizedMessage) {
      alert("Message cannot be empty.");
      return;
    }

    if (!receiverPublicKey.trim()) {
      alert("Receiver's public key cannot be empty.");
      return;
    }

    const encrypted = encryptMessage(sanitizedMessage, receiverPublicKey);
    if (encrypted) {
      console.log("Encrypted:", encrypted);
      setEncryptedMessage(encrypted);
    } else {
      alert("Encryption failed. Please try again.");
    }
  };

  const handleDecrypt = () => {
    if (!encryptedMessage) {
      alert("No encrypted message to decrypt.");
      return;
    }

    const decrypted = decryptMessage(
      encryptedMessage.encryptedMessage,
      encryptedMessage.nonce,
      receiverPublicKey
    );
    if (decrypted) {
      console.log("Decrypted Message:", decrypted);
      setDecryptedMessage(decrypted);
    } else {
      alert("Decryption failed. Ensure the keys and data are correct.");
    }
  };

  return (
    <div>
      <h1>Quantum Encryption Demo</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a message"
      />
      <button onClick={handleEncrypt}>Encrypt</button>
      {encryptedMessage && (
        <div>
          <h2>Encrypted Message</h2>
          <p>{encryptedMessage.encryptedMessage}</p>
          <button onClick={handleDecrypt}>Decrypt</button>
        </div>
      )}
      {decryptedMessage && (
        <div>
          <h2>Decrypted Message</h2>
          <p>{decryptedMessage}</p>
        </div>
      )}
    </div>
  );
}

export default QuantumEncryptionDemo;
