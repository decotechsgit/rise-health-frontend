declare global {
  type ApiResponse<T> = T;

  // type ApiResponse<T> = {
  //   responseCode: number;
  //   developerMessage: string;
  //   payload: T;
  // };
  type ApiErrorResponse = {
    statusCode?: number;
    timestamp?: string;
    path: string;
    message: string;
  };
  type PaginatedApiResponse<T> = ApiResponse<{
    data: T[];
    users: T[];
    sports: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
  }>;

  type ErrorResponse = {
    message: string;
    errors?: Record<string, string[]>;
    status: number;
  };

  type OrderBy = "asc" | "desc";
}

export {};
