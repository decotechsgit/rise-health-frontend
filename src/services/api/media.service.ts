import { ApiClient } from "@api/client.service";

class MediaService extends ApiClient {
  constructor() {
    super("/file-uploads");
  }

  async uploadFile(data: FormData) {
    return this.post<UploadFile>("/upload", data);
  }

  async getFile(id: string) {
    return this.get("/", { id });
  }

  async deleteFile(id: string) {
    return this.delete(`/${id}`);
  }

  async uploadMultipleFiles(data: FormData) {
    return this.post<UploadFile[]>("/upload-multiple", data);
  }

  async getSignedUrl(id: string) {
    return this.get<SignedUrl>(`/${id}/signed-url`);
  }
}

export const mediaService = new MediaService();
