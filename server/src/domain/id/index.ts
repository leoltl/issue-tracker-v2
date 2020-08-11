import { v4 as uuidv4 } from "uuid";

const id: IId = {
  genId(): string {
    return uuidv4();
  },
  validId(id): boolean {
    const uuidv4Regex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    return uuidv4Regex.test(id);
  }
}

export const mongoId: IId = {
  genId(): string {
    return undefined;
  },
  validId(id): boolean {
    const mongoId = new RegExp("^[0-9a-fA-F]{24}$")
    return mongoId.test(id);
  }
}

export interface IId {
  genId(): string
  validId(id): boolean
}

export const mockId = {
  genId(): string {
    return '_' + Math.random().toString(36).substr(2, 9)
  },
  validId(id): boolean {
    return id.charAt(0) == "_";
  }
};

export default id;