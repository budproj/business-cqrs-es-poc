export type Primitives = string | number | boolean

export type DomainPrimitive<T = Primitives> = {
  value: T
}
