class memoryStorage {
  _store:any = {};

  key() {}
  getItem(key: string): any {
    return this._store[key];
  }
  setItem(key: string, data: any): any {
    this._store[key] = data;
    return data;
  }
  removeItem(key: string) {
    delete this._store[key];
  }
  clear() {
    this._store = {};
  }
}

const local = window.localStorage;
const session = window.sessionStorage;
const memory = new memoryStorage();
const STORAGE = { local, session, memory };

const createStorage = (type: "local" | "session" | "memory"): any => STORAGE[type];


export {
  createStorage
};