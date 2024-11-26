import nacl from "tweetnacl";
import naclUtil from "tweetnacl-util";

// Generate a key pair
const keyPair = nacl.box.keyPair();

export const publicKey = naclUtil.encodeBase64(keyPair.publicKey);
export const privateKey = naclUtil.encodeBase64(keyPair.secretKey);

// Encrypt a message
export function encryptMessage(message, receiverPublicKey) {
  try {
    const nonce = nacl.randomBytes(nacl.box.nonceLength);
    const messageUint8 = naclUtil.decodeUTF8(message);
    const receiverPublicKeyUint8 = naclUtil.decodeBase64(receiverPublicKey);
    const sharedSecret = nacl.box(
      messageUint8,
      nonce,
      receiverPublicKeyUint8,
      naclUtil.decodeBase64(privateKey)
    );

    if (!sharedSecret) throw new Error("Encryption failed");

    return {
      nonce: naclUtil.encodeBase64(nonce),
      encryptedMessage: naclUtil.encodeBase64(sharedSecret),
    };
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
}

// Decrypt a message
export function decryptMessage(encryptedMessage, nonce, senderPublicKey) {
  try {
    const encryptedMessageUint8 = naclUtil.decodeBase64(encryptedMessage);
    const nonceUint8 = naclUtil.decodeBase64(nonce);
    const senderPublicKeyUint8 = naclUtil.decodeBase64(senderPublicKey);

    const decryptedMessage = nacl.box.open(
      encryptedMessageUint8,
      nonceUint8,
      senderPublicKeyUint8,
      naclUtil.decodeBase64(privateKey)
    );

    if (!decryptedMessage) {
      throw new Error("Decryption failed");
    }

    return naclUtil.encodeUTF8(decryptedMessage);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}
