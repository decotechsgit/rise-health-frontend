import { ApiClient } from "./client.service";

class PackageService extends ApiClient {
  constructor() {
    super("/packages");
  }

  // Get all packages
  getAllPackages() {
    return this.get<TPackage[]>("/with-categories-and-subcategories");
  }
}

export const packageService = new PackageService();
