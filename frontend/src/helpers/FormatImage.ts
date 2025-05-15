import imageCompression from "browser-image-compression";

export const convertImageToBase64 = async (imagePath: string): Promise<string> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    // 1. Fetch the image
    const response = await fetch(imagePath);
    const blob = await response.blob();

    // 2. Convert Blob to File (with a dummy filename)
    const file = new File([blob], "image.jpg", { 
      type: blob.type,
      lastModified: Date.now() 
    });

    // 3. Compress the image
    const compressedFile = await imageCompression(file, options);

    // 4. Convert to Base64
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert image to Base64"));
        }
      };
      reader.onerror = () => reject(new Error("FileReader error"));
      reader.readAsDataURL(compressedFile);
    });
  } catch (error) {
    console.error("Image processing error:", error);
    throw error;
  }
};