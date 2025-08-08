declare global {
  type UploadMediaParams = {
    file: string;
    category: string;
    metadata?: Record<string, string | number | boolean>;
  }
  type UploadFile = {
    "id": string;
    "fileName": string;
    "originalName": string;
    "s3Url": string;
    "size": number,
    "mimeType": string;
    "createdAt": string;
    signedUrl: string;
  }
  type SignedUrl = { signedUrl: string }
}
export {}