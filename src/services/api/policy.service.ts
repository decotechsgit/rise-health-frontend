import { ApiClient } from "./client.service";

class PolicyService extends ApiClient {
  constructor() {
    super("/policies");
  }

  // Create a new policy
  create(data: TPolicyPayload) {
    return this.post("/", data);
  }

  // Update a policy
  updatePolicy(policyId: string, data: TPolicyPayload) {
    return this.patch(`/${policyId}`, data);
  }

  // Get a policy by policyId
  getPolicy(policyId: string) {
    return this.get<TPolicy>(`/${policyId}`);
  }

  // Get a policy
  getPoliciesBySubcategoryId(referenceId: string, referenceType: string) {
    return this.get<TPolicyList>("", {
      referenceId: referenceId,
      referenceType: referenceType,
    });
  }
}

export const policyService = new PolicyService();
