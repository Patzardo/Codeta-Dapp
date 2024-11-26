// import React, { useState } from "react";
// import {
//   FleekSdk,
//   ApplicationAccessTokenService,
// } from "@fleek-platform/sdk/browser";

// function FleekRetrieve() {
//   const [hash, setHash] = useState("");
//   const [fileData, setFileData] = useState(null);

//   // Configure the ApplicationAccessTokenService
//   const applicationService = new ApplicationAccessTokenService({
//     clientId: "client_NSez4i7UHB-0M6r2OJp-", // Use your actual client ID here
//   });

//   // Create a new Fleek SDK instance
//   const fleekSdk = new FleekSdk({
//     accessTokenService: applicationService,
//   });

//   const handleHashChange = (event) => {
//     setHash(event.target.value);
//   };

//   const handleRetrieve = async () => {
//     if (!hash) {
//       alert("Please enter an IPFS hash");
//       return;
//     }

//     try {
//       // Retrieve the file using the Fleek SDK
//       const result = await fleekSdk.storage.get({ cid: hash });

//       // Assuming the file is text or JSON, you can convert it to a readable format
//       const fileContent = await result.text();
//       setFileData(fileContent);
//     } catch (error) {
//       console.error("Error retrieving file:", error);
//       alert("Failed to retrieve file.");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter IPFS hash"
//         value={hash}
//         onChange={handleHashChange}
//       />
//       <button onClick={handleRetrieve}>Retrieve from Fleek</button>

//       {fileData && (
//         <div>
//           <h3>File Content:</h3>
//           <pre>{fileData}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FleekRetrieve;
import React, { useState } from "react";
import axios from "axios";

function FleekRetrieve() {
  const [url, setUrl] = useState("");
  const [imageSrc, setImageSrc] = useState(null);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleRetrieve = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    try {
      // Retrieve the file from the specified IPFS URL as a blob
      const response = await axios.get(url, {
        responseType: "blob",
      });

      // Convert the blob to an object URL to display the image
      const imageUrl = URL.createObjectURL(response.data);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error("Error retrieving file:", error);
      alert("Failed to retrieve file.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter IPFS URL"
        value={url}
        onChange={handleUrlChange}
      />
      <button onClick={handleRetrieve}>Retrieve from IPFS</button>

      {imageSrc && (
        <div>
          <h3>Retrieved Image:</h3>
          <img src={imageSrc} alt="Retrieved from IPFS" />
        </div>
      )}
    </div>
  );
}

export default FleekRetrieve;
