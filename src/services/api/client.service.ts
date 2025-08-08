import queryString from "query-string";

import { getUniversalSession } from "@/lib/server/session";

import { ApplicationHTTPError } from "./client.error";

export class ApiClient {
  protected baseURL: string;
  protected basePath: string;

  constructor(basePath: string) {
    this.baseURL = process.env.NEXT_PUBLIC_BACKEND_URI || "";
    this.basePath = basePath;
  }

  private async getBodyResponse<T>(
    response: Response
  ): Promise<ApiResponse<T>> {
    let parsedResponse = {};
    try {
      parsedResponse = await response.json();
    } catch (error) {
      console.error("Failed to parse response as JSON", error);
      parsedResponse = await response.text();
    }
    if (!response.ok) {
      throw new ApplicationHTTPError(
        response,
        parsedResponse as ApiErrorResponse
      );
    }

    return parsedResponse as ApiResponse<T>;
  }

  protected getUrl(
    path: string,
    params?: Record<string, string | number>
  ): string {
    const queryParams = params ? `?${queryString.stringify(params)}` : "";
    return `${this.baseURL}${this.basePath}${path}${queryParams}`;
  }

  protected async getHeaders(): Promise<HeadersInit> {
    const session = (await getUniversalSession()) as {
      user: { token: string };
    };

    return {
      "Content-Type": "application/json",
      ...(session?.user?.token
        ? { Authorization: `Bearer ${session.user.token}` }
        : {}),
    };
  }

  protected async get<T>(
    path: string,
    params?: Record<string, string | number>,
    cache: RequestCache = "no-store"
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.getUrl(path, params), {
        headers: await this.getHeaders(),
        cache,
        next: {
          revalidate: cache === "force-cache" ? 3600 : 0, // Revalidate cached data every hour if force-cache is used
        },
      });
      // const cloneResponse = await response.clone().text();
      // console.dir(JSON.parse(cloneResponse), { depth: null });
      if (!response.ok) {
        throw new ApplicationHTTPError(response, await response.json());
      }

      // Check if response is valid JSON before parsing
      // const contentType = response.headers.get("content-type");
      // if (!contentType || !contentType.includes("application/json")) {
      //   throw new Error(`Invalid content type: ${contentType}`);
      // }

      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch (error) {
        console.error("Failed to parse JSON response:", text, error);
        throw new Error("Invalid JSON response from server");
      }
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  protected async getPaginated<T>(
    path: string,
    params?: Record<string, string | number>
  ): Promise<PaginatedApiResponse<T>> {
    const response = await fetch(this.getUrl(path, params), {
      headers: await this.getHeaders(),
    });

    if (!response.ok) {
      throw new ApplicationHTTPError(response, await response.json());
    }

    return this.getBodyResponse(response);
  }

  protected async post<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const headers = await this.getHeaders();
    const isFormData = body instanceof FormData;

    if (isFormData) {
      delete (headers as Record<string, string>)["Content-Type"];
    }

    const response = await fetch(this.getUrl(path, params), {
      method: "POST",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });
    if (!response.ok) {
      throw new ApplicationHTTPError(response, await response.json());
    }
    return this.getBodyResponse(response);
  }

  protected async put<T, U>(
    path: string,
    body?: U,
    params?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const headers = await this.getHeaders();
    const isFormData = body instanceof FormData;

    if (isFormData) {
      delete (headers as Record<string, string>)["Content-Type"];
    }

    const response = await fetch(this.getUrl(path, params), {
      method: "PUT",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });

    if (!response.ok) {
      throw new ApplicationHTTPError(response, await response.json());
    }

    return this.getBodyResponse(response);
  }

  protected async delete<T>(
    path: string,
    params?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const response = await fetch(this.getUrl(path, params), {
      method: "DELETE",
      headers: await this.getHeaders(),
    });

    return this.getBodyResponse(response);
  }

  protected async patch<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const headers = await this.getHeaders();
    const isFormData = body instanceof FormData;

    if (isFormData) {
      delete (headers as Record<string, string>)["Content-Type"];
    }

    const response = await fetch(this.getUrl(path, params), {
      method: "PATCH",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });

    if (!response.ok) {
      throw new ApplicationHTTPError(response, await response.json());
    }

    return this.getBodyResponse(response);
  }
}
