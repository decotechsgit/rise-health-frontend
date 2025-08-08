import { ApiClient } from "./client.service";

class PolicyCopiesService extends ApiClient {
  constructor() {
    super("/policy-copies");
  }

  // Get a policy copies
  getPolicyCopies(referenceId: string, referenceType: string) {
    return this.get<TPolicyList>(
      `?referenceId=${referenceId}&referenceType=${referenceType}`
    );
  }
}

export const policyCopiesService = new PolicyCopiesService();
