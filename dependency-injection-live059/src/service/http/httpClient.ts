/**
 * Browser-standard configuration extending RequestInit
 */
export interface FetchRequestConfig extends Omit<RequestInit, "body"> {
  /** Query string params: e.g. { page: 1, limit: 10 } */
  params?: Record<string, string | number | boolean | undefined | null>;
  /** Timeout in milliseconds (defaults to client timeout or 30s) */
  timeout?: number;
  /** Skip generic error transformation if you need raw errors */
  skipErrorTransform?: boolean;
}

export interface IHttpClientOptions {
  getToken?: () => Promise<string | undefined> | string | undefined;
  timeout?: number;
  /** Callback on 401: e.g. navigate to /login or clear local storage */
  onUnauthorized?: () => void | Promise<void>;
  /** Callback on 403: access forbidden */
  onForbidden?: () => void | Promise<void>;
  /** Default credentials mode (e.g. 'include' if using httpOnly cookies) */
  credentials?: RequestCredentials;
}

class HttpClient {
  private readonly baseURL: string;
  private readonly options: IHttpClientOptions;

  constructor(baseURL: string, options: IHttpClientOptions = {}) {
    this.baseURL = baseURL;
    this.options = options;
  }

  /**
   * Core request dispatcher (replaces Axios interceptors pipeline)
   */
  private async request<TResponse>(
    endpoint: string,
    method: string,
    data?: unknown,
    config: FetchRequestConfig = {},
    responseType: "json" | "blob" = "json"
  ): Promise<TResponse> {
    // 1. Build standard Browser URL with search params
    const url = new URL(
      endpoint.replace(/^\//, ""),
      this.baseURL.endsWith("/") ? this.baseURL : `${this.baseURL}/`
    );

    if (config.params) {
      Object.entries(config.params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          url.searchParams.append(key, String(val));
        }
      });
    }

    // 2. Setup Headers & Authorization Token
    const headers = new Headers(config.headers);

    // Only add application/json if sending an object (not FormData, string, or Blob)
    const isJsonPayload = data && !(data instanceof FormData) && !(data instanceof Blob);
    if (isJsonPayload && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (this.options.getToken) {
      const token = await this.options.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    // 3. Setup Timeout + respect React/React Query's cancellation signal
    const timeoutMs = config.timeout ?? this.options.timeout ?? 30_000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    // Chain with user-provided signal (e.g. TanStack Query or useEffect abort)
    const signal = config.signal
      ? AbortSignal.any([config.signal, controller.signal])
      : controller.signal;

    const body = data !== undefined && data !== null
      ? (isJsonPayload ? JSON.stringify(data) : (data as BodyInit))
      : undefined;

    try {
      const response = await fetch(url.toString(), {
        ...config,
        method,
        headers,
        credentials: config.credentials ?? this.options.credentials ?? "same-origin",
        signal,
        ...(body !== undefined ? { body } : {}),
      });

      // 4. Handle HTTP Status Errors (replaces Axios response error interceptor)
      if (!response.ok) {
        if (response.status === 401) await this.options.onUnauthorized?.();
        if (response.status === 403) await this.options.onForbidden?.();

        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP Error ${response.status}: ${response.statusText}`);
      }

      // 5. Handle response formats (Blob vs JSON vs Empty 204)
      if (responseType === "blob") {
        return (await response.blob()) as TResponse;
      }

      if (response.status === 204) {
        return undefined as TResponse;
      }

      return (await response.json()) as TResponse;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /* =========================================================================
   *  METHODS RESTRUCTURING (Lines 167-193 in pure React)
   * ========================================================================= */

  async get<TResponse>(url: string, config?: FetchRequestConfig): Promise<TResponse> {
    return this.request<TResponse>(url, "GET", undefined, config, "json");
  }

  async post<TResponse>(url: string, data?: unknown, config?: FetchRequestConfig): Promise<TResponse> {
    return this.request<TResponse>(url, "POST", data, config, "json");
  }

  async put<TResponse>(url: string, data?: unknown, config?: FetchRequestConfig): Promise<TResponse> {
    return this.request<TResponse>(url, "PUT", data, config, "json");
  }

  async patch<TResponse>(url: string, data?: unknown, config?: FetchRequestConfig): Promise<TResponse> {
    return this.request<TResponse>(url, "PATCH", data, config, "json");
  }

  async delete<TResponse>(url: string, config?: FetchRequestConfig): Promise<TResponse> {
    return this.request<TResponse>(url, "DELETE", undefined, config, "json");
  }

  async getBlob(url: string, config?: FetchRequestConfig): Promise<Blob> {
    return this.request<Blob>(url, "GET", undefined, config, "blob");
  }

  async postBlob(url: string, data?: unknown, config?: FetchRequestConfig): Promise<Blob> {
    return this.request<Blob>(url, "POST", data, config, "blob");
  }
}

export default HttpClient;
