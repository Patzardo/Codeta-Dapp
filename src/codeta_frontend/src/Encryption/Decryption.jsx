export function decryptMessage(encryptedMessage, nonce, senderPublicKey) {
  const encryptedMessageUint8 = naclUtil.decodeBase64(encryptedMessage);
  const nonceUint8 = naclUtil.decodeBase64(nonce);
  const senderPublicKeyUint8 = naclUtil.decodeBase64(senderPublicKey);

  const decryptedMessage = nacl.box.open(
    encryptedMessageUint8,
    nonceUint8,
    senderPublicKeyUint8,
    naclUtil.decodeBase64(privateKey)
  );

  return naclUtil.encodeUTF8(decryptedMessage);
}
