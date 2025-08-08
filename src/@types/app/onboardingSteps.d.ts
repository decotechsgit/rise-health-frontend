type StepType = "main" | "file_upload" | "checkbox" | "registration_list";

declare global {
  type UploadsItem ={
    id: string;
    name: string;
    size: number;
    type: string;
    isDeleted: boolean;
    signedUrl: string;
  }
  type Uploads = {
    receive_file_upload?: Record<string, UploadsItem[]>;
  }

  type Registrations = {
    prepare_registration_select?: Record<string, boolean>;
  }

  type Progress = {
    checkboxes?: Record<string, boolean>;
    uploads?: Uploads;
    registrations?: Registrations;
    completedSteps?: string[];
  }
  type Step = {
    id: string;
    title: string;
    description?: StringOrNull;
    type: StepType;
    order: number;
    stepKey: string;
    linkUrl?: StringOrNull;
    linkText?: StringOrNull;
    parentId?: StringOrNull;
    children?: Step[];
    videoUrl?: string;
    tips?: string[];
    checkboxTipBar?: string;
  }

  type OnboardingProgress = {
    userId?: string;
    progress?: Progress;
    currentStepKey?: string;
    startedAt?: string;
    lastUpdatedAt?: string;
    completedAt?: StringOrNull;
  }
  type RegistrationGroup = {
    id: string;
    registrationNo: string;
    name: string;
    description: string;
    auditType: string;
    personalNotes: string | null;
    riskLevel: string | null;
    ndisStandardsModules: string | null;
  };
  type SuggestedPackage = {
    id: string;
    name: string;
    description: string;
    tags?: string[];
    packageType: string;
  }
}
export {};
