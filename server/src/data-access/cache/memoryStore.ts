export class MemoryStore {
  private storage;
  
  constructor() {
    this.storage = {}
  }

  get(key: string): any|null{
    return this.storage[key] || null
  }

  set(key: string, value: any): boolean {
    if (!key || !value) return false
    this.storage[key] = value
    return true
  }

  del(key: string): boolean {
    if (this.storage[key]) {
      delete this.storage[key]
      return true
    }
    return false
  }

  flushAll(): boolean {
    try {
      this.storage = {}
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
  // if useful?

  // TODO: set expiration SETEX

  // TODO: remove timeout for key PERSIST

  // TODO: rename a key
}