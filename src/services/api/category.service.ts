import { ApiClient } from "./client.service";

class CategoryService extends ApiClient {
  constructor() {
    super("/category");
  }

  // Get all categories
  getAllCategories() {
    return this.get<TCategory[]>("/with-subcategories/all");
  }
}

export const categoryService = new CategoryService();
