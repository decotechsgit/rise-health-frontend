declare global {
  type TPolicyPayload = {
    categoryId: string;
    subcategoryId: string;
    content: string;
    title: string;
  };

  type TPolicy = {
    id: string;
    title: string;
    subCategoryId: string;
    content: string;
  };

  type TPolicyList = {
    items: TPolicy[];
  };
}

export {};
