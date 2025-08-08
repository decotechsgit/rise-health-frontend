export class ApplicationHTTPError extends Error {
  status: number;
  statusText: string;
  responseData?: ApiErrorResponse;
  url: string;

  constructor(response: Response, body: ApiErrorResponse) {
    super(`HTTP error! status: ${response.status}`);
    this.name = 'ApplicationHTTPError';
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
    this.responseData = body;
  }

  /**
   * Get a user-friendly error message
   */
  getUserMessage(): string {
    return this.responseData?.message || 'An unknown error occurred';
  }
}
