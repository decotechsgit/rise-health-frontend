import { ApiClient } from "./client.service";

class FormService extends ApiClient {
  constructor() {
    super("/forms");
  }

  // GET /form/all
  async getAllForms(referenceId: string, referenceType: string) {
    console.log("referenceType: ", referenceType);
    return await this.get<TFormData[]>(`/all`, {
      referenceId: referenceId,
      referenceType: referenceType,
    });
  }

  // GET /form/{id}
  getFormById(id: string) {
    return this.get<TFormData>(`/${id}`);
  }

  // PUT /form-section/{id}
  updateFormSection(id: string, data: Record<string, unknown>) {
    return this.put(`/form-section/${id}`, data);
  }

  // DELETE /form-section/{id}
  deleteFormSection(id: string) {
    return this.delete(`/form-section/${id}`);
  }

  // POST /form-section
  createFormSection(data: Record<string, unknown>) {
    return this.post("/form-section", data);
  }
}

export const formService = new FormService();
