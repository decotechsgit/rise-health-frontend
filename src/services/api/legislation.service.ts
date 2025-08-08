import { ApiClient } from "./client.service";

class LegislationService extends ApiClient {
  constructor() {
    super("/legislation-link");
  }

  // Get all legislations
  getAll(referenceId: string, referenceType: string) {
    return this.get<TLegislation[]>("/", {
      referenceId: referenceId,
      referenceType: referenceType,
    });
  }

  // Get a single legislation by ID
  getById(id: string) {
    return this.get<TLegislation>(`/${id}`);
  }

  // Create a new legislation
  create(data: Partial<TLegislation>) {
    return this.post<TLegislation>("/", data);
  }

  // Update an existing legislation
  update(id: string, data: Partial<TLegislation>) {
    return this.put<TLegislation, Partial<TLegislation>>(`/${id}`, data);
  }

  // Delete a legislation
  deleteLegislation(id: string): Promise<ApiResponse<TLegislation>> {
    return this.delete(`/${id}`);
  }

  // Add more methods as needed for other endpoints (e.g., search, status update, etc.)
}

export const legislationService = new LegislationService();
