export * from "./memoryStore";

export interface ICache {
  get(key: string): any|null 

  set(key: string, value: any): boolean 

  del(key: string): boolean 

  flushAll(): boolean 
}