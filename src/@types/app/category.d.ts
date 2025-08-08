declare global {
  type TLegislationLink = {
    id?: string;
    url?: string;
    title?: string;
    description?: string;
    siteName?: string;
    metadata?: Record<string, unknown> | null;
    subCategoryId?: string;
  };

  type TSubCategory = {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    description: string;
    categoryId: string;
    policies: TPolicy | null;
    forms: Record<string, unknown> | null;
    policyCopy: Record<string, unknown> | null;
    legislationLinks: TLegislationLink | null;
    subCategories: TSubCategory[];
  };

  type TCategory = {
    id: string;
    name: string;
    description: string;
    tags: string | null;
    packageId?: string;
    subCategories: TSubCategory[];
  };

  type TPackage = {
    id: string;
    name: string;
    description: string;
    tags: string[] | null;
    categories: TCategory[];
  };
}

export {};
