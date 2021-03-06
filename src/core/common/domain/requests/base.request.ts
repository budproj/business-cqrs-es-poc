export interface DomainRequest<T = any> {
  marshal: () => T
}
