export interface IActionSuccess<TBody extends Record<string, any>> {
  status: 'success';
  body?: TBody;
}

export interface IActionError<TErrBody extends Record<string, any>> {
  status: 'error';
  body?: TErrBody;
}

export type IActionResponse<
  TSuccessBody extends Record<string, any>,
  TErrBody extends Record<string, any>
> = IActionSuccess<TSuccessBody> | IActionError<TErrBody>;
