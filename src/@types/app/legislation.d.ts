declare global {
  interface TLegislationMetadata {
    error?: string;
    author?: string;
    fetchedAt?: string;
    description?: string;
    title?: string;
    image?: string;
    publishDate?: string;
    errorMessage?: string;
  }

  interface TLegislationCategory {
    id: string;
    name: string;
    description: string;
    tags: string[] | null;
  }

  interface TLegislationSubCategory {
    id: string;
    name: string;
    description: string;
    categoryId: string;
  }

  interface TLegislation {
    id: string;
    url: string;
    title: string;
    description: string;
    siteName: string;
    metadata?: TLegislationMetadata;
    categoryId: string;
    subCategoryId: string;
    category: TLegislationCategory;
    subCategory: TLegislationSubCategory;
    linkList?: TLegislationLink[];
  }
}

export {};
