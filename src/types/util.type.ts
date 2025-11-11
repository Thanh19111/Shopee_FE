export interface SuccessResponse<T>{
  message: string;
  data: T;
}

export interface ErrorResponse<T>{
  message: string;
  data?: T;
}

// cú pháp `-?` sẽ loại bỏ key optional
export type NoUndefindedField<T> = {
  [P in keyof T]-?: NoUndefindedField<NonNullable<T[P]>>
}

