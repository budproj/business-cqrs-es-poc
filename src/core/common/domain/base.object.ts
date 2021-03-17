export abstract class DomainObject {
  protected isEmpty(value: unknown): boolean {
    if (this.isNumber(value)) return false
    if (this.isBoolean(value)) return false
    if (this.isDate(value)) return false
    if (this.isUndefined(value)) return true
    if (this.isNull(value)) return true
    if (this.isEmptyString(value)) return true
    if (this.isEmptyArray(value)) return true
    if (this.isEmptyObject(value)) return true
    if (this.isArrayWithEmptyContent(value)) return true

    return false
  }

  private isNumber(value: unknown): boolean {
    return typeof value === 'number'
  }

  private isBoolean(value: unknown): boolean {
    return typeof value === 'boolean'
  }

  private isDate(value: unknown): boolean {
    return value instanceof Date
  }

  private isEmptyArray(value: unknown): boolean {
    return Array.isArray(value) && value.length === 0
  }

  private isArrayWithEmptyContent(value: unknown): boolean {
    return Array.isArray(value) && value.every((item) => this.isEmpty(item))
  }

  private isEmptyString(value: unknown): boolean {
    return value === ''
  }

  private isEmptyObject(value: unknown): boolean {
    return value instanceof Object && Object.keys(value).length === 0
  }

  private isUndefined(value: unknown): boolean {
    return typeof value === 'undefined'
  }

  private isNull(value: unknown): boolean {
    return value === null
  }
}
