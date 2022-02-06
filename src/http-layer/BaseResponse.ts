export interface RESPONSE_CALLBACKS{
  onSuccess(apiId: string, response: any)
  onFailure(apiId: string, error: any)
}