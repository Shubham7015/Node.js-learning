class ApiResponse<T> {
  data: T;
  statusCode: number;
  message: string;
  success: boolean;

  constructor(statusCode: number, data:T ,  message: string = "Success") {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
