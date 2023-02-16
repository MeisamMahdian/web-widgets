const imageToBase64 = (blob: File | Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            if (reader.result && typeof reader.result === "string") {
                resolve(reader.result);
            } else {
                reject(new Error("Error reading file"));
            }
        };
    });
};

export { imageToBase64 };
