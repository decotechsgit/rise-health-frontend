import { ApiClient } from "./client.service";

class FormSubmissionService extends ApiClient {
  constructor() {
    super("/form-submissions");
  }

  private buildFormData({
    formCopyId,
    data,
    files,
    removedFiles,
  }: {
    formCopyId?: string;
    data: Record<string, string | boolean | number>;
    files?: Record<string, File[]>;
    removedFiles?: Record<string, TFormFileData[]>;
  }) {
    const formDataObj = new FormData();

    if (formCopyId) {
      formDataObj.append("formCopyId", formCopyId);
    }

    formDataObj.append(
      "data",
      JSON.stringify({
        fields: data || {},
      })
    );

    if (files) {
      Object.entries(files).forEach(([fieldId, fileArr]) => {
        fileArr.forEach((f) => {
          const file =
            "file" in f && f.file instanceof File
              ? f.file
              : f instanceof File
                ? f
                : null;
          if (file) {
            formDataObj.append(`files[${fieldId}]`, file);
          }
        });
      });
    }

    const filesToRemoveObj: Record<string, TFormFileData[]> = {};

    if (removedFiles) {
      Object.entries(removedFiles).forEach(([fieldId, fileArr]) => {
        filesToRemoveObj[`files[${fieldId}]`] = fileArr;
      });

      formDataObj.append("filesToRemove", JSON.stringify(filesToRemoveObj));
    }

    return formDataObj;
  }

  // POST /form-submission
  createFormSubmission(payload: {
    formCopyId: string;
    data: Record<string, string | boolean | number>;
    files?: Record<string, File[]>;
    removedFiles?: Record<string, TFormFileData[]>;
  }) {
    const formDataObj = this.buildFormData(payload);
    return this.post("/", formDataObj);
  }

  // GET /api/form-submission
  getFormSubmission(id: string) {
    return this.get(`/${id}`);
  }

  // PATCH /api/form-submission
  updateFormSubmission(
    id: string,
    payload: {
      data: Record<string, string | boolean | number>;
      files?: Record<string, File[]>;
      removedFiles?: Record<string, TFormFileData[]>;
    }
  ) {
    // No formCopyId for update
    const formDataObj = this.buildFormData({ ...payload });
    return this.patch(`/${id}`, formDataObj);
  }

  // GET /form-submissions/form-copy/:formCopyId
  async getSubmissionByFormCopyId(formCopyId: string) {
    const response = await this.get<TFormData>(`/form-copy/${formCopyId}`);

    if (response.formCopy) {
      response.formBody = response.formCopy.formBody;
      response.title = response.formCopy.title;
      response.description = response.formCopy.description;
    }

    return response;
  }
}

export const formSubmissionService = new FormSubmissionService();
