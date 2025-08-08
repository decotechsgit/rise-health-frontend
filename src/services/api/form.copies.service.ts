import { ApiClient } from "./client.service";

class FormCopyService extends ApiClient {
  constructor() {
    super("/form-copies");
  }
  // POST /api/form-copy
  async createFormCopy(formCopyPayload: TFormCopyRequest) {
    const response = await this.post<TFormCopyResponse>("/", formCopyPayload);
    return response;
  }

  // GET /api/form-copy
  getAllFormCopies(referenceId?: string, referenceType?: string) {
    return this.get<TFormCopyResponse[]>("/", {
      referenceId: referenceId || "",
      referenceType: referenceType || "",
    });
  }

  // GET /api/form-copy/{id}
  getFormCopyById(id: string) {
    return this.get<TFormData>(`/${id}`);
  }

  // PUT /api/form-copy/{id}
  updateFormCopy(formCopyPayload: TFormCopyRequest) {
    return this.put(`/${formCopyPayload.originalFormId}`, formCopyPayload);
  }

  // GET /api/form-copy/all
  getAllFormCopiesBySubcategoryId(subcategoryId: string) {
    return this.get<TFormCopyResponse[]>("", {
      subCategoryId: subcategoryId,
    });
  }
}

export const formCopyService = new FormCopyService();
