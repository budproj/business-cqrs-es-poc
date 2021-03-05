export type Primitives = string | number | boolean

export interface DomainPrimitive<T = Primitives> {
  value: T
}
