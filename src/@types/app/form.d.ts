declare global {
  type FormValuesType = Record<string, string | number | boolean>;

  type TValidationRules = {
    required?: string | { value: boolean; message: string };
    [key: string]: string | number | boolean | object | undefined;
  };

  type TFormField = {
    id?: string;
    type: string;
    label: string;
    required?: boolean | string;
    sections?: string[];
    options?: string[];
    placeholder?: string;
  };

  type TFormBody = {
    fields: TFormField[];
  };

  type TFormCategory = {
    id: string;
    name: string;
    description: string;
    tags: string | null;
  };

  type TFormFileData = {
    fieldId?: string;
    size: number;
    s3Key: string;
    fileName: string;
    mimeType: string;
    signedUrl: string;
  };

  type TFormData = {
    id: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    title?: string;
    description?: string;
    category?: TFormCategory;
    categoryId?: string;
    subCategoryId?: string;
    policyId?: string;
    formCopy?: TFormCopyResponse;
    formBody?: TFormBody;
    status: "draft" | "published" | "archived";
    version?: number;
    formCopyId?: string;
    originalFormId?: string;
    providerId?: string;
    data?: {
      files?: TFormFileData[];
      fields?: Record<string, string | boolean | number>;
    };
  };

  type TExpandedState = {
    id: string;
    isExpanded: boolean;
  };

  type TNavItem = {
    id: string;
    label: string;
    href?: string | ((formId: string) => string);
  };

  type TNavBarProps = {
    items: TNavItem[];
    activeItem: string;
    onNavChange: (item: TNavItem) => void;
    className?: string;
  };

  type TFormCopyRequest = {
    originalFormId: string;
    title: string;
    description: string;
    formBody: TFormBody;
  };

  type TFormCopyResponse = {
    id: string;
    title: string;
    originalFormId: string;
    providerId: string;
    description: string;
    formBody: TFormBody;
    status: "draft" | "published";
    subCategoryId?: string;
    referenceId?: string;
    type?: string;
  };

  type TFormSubmissionRequest = {
    formCopyId: string;
    data: Record<string, string | boolean | number>;
    files?: Record<string, File[]>;
  };

  type TFormSubmissionResponse = {
    id: string;
    formCopy: {
      id: string;
      formSubmission: null;
      title: string;
      originalFormId: string;
      providerId: string;
      description: string;
      formBody: {
        fields: TFormField[];
      };
      status: string;
    };
    formCopyId: string;
    data: Record<string, string | boolean | number>;
  };

  type FieldType = {
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    required: boolean | string;
    sections?: string[];
    options?: string[];
  };
}

// This export is needed to make the file a module
export {};
