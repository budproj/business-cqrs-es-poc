export interface ApplicationRequest<T = any> {
  marshal: () => T
}
