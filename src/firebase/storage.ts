import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig"; // Import your storage configuration

const uploadFile = async (file: File) => {
  try {
    const storageRef = ref(storage, `products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Handle progress updates here
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        if (error instanceof Error) {
          console.error("Upload error:", error.message);
          alert(`Upload failed: ${error.message}`);
        } else {
          console.error("Unknown error occurred during upload:", error);
          alert("An unknown error occurred during upload.");
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at:", downloadURL);
          // Use downloadURL as needed, e.g., save it to Firestore
        });
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error uploading file:", error.message);
      alert(`Error uploading file: ${error.message}`);
    } else {
      console.error("Unknown error occurred during file upload:", error);
      alert("An unknown error occurred.");
    }
  }
};
