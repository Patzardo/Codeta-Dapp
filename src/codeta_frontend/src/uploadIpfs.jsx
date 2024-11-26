import React, { useState } from "react";
import {
  FleekSdk,
  ApplicationAccessTokenService,
} from "@fleek-platform/sdk/browser";

function FleekUpload() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");

  // Configure the ApplicationAccessTokenService
  const applicationService = new ApplicationAccessTokenService({
    clientId: "client_NSez4i7UHB-0M6r2OJp-", // Use your actual client ID here
  });

  // Create a new Fleek SDK instance
  const fleekSdk = new FleekSdk({
    accessTokenService: applicationService,
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    try {
      // Upload the file using the Fleek SDK
      const result = await fleekSdk.storage().uploadFile({
        file: file,
        onUploadProgress: (progress) => {
          console.log(
            `Upload progress: ${(progress.loaded / progress.total) * 100}%`
          );
        },
      });

      setHash(result.hash);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload to Fleek</button>

      {hash && (
        <p>
          File uploaded successfully! IPFS Hash:{" "}
          <a href={`https://ipfs.fleek.co/ipfs/${hash}`}>{hash}</a>
        </p>
      )}
    </div>
  );
}

export default FleekUpload;
