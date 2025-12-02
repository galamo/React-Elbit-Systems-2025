// Type Declaration Examples

// Example 1: Declare a global variable
declare const APP_VERSION: string;
declare const IS_PRODUCTION: boolean;

// Example 2: Declare a global function
declare function logMessage(
  message: string,
  level?: "info" | "warn" | "error"
): void;

// Example 3: Declare a namespace
declare namespace MathUtils {
  function add(a: number, b: number): number;
  function subtract(a: number, b: number): number;
  const PI: number;
}

// Example 4: Declare a module
declare module "my-custom-library" {
  export interface Config {
    apiKey: string;
    timeout: number;
  }

  export class Client {
    constructor(config: Config);
    request(url: string): Promise<any>;
  }

  export function initialize(config: Config): Client;
}

// Example 5: Declare module for file types
declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

// Example 6: Extend global Window interface
declare global {
  interface Window {
    myCustomAPI: {
      version: string;
      init(): void;
      destroy(): void;
    };
    gtag?: (...args: any[]) => void;
  }
}

// Example 7: Extend NodeJS namespace
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    API_URL: string;
    DATABASE_URL: string;
  }

  interface Global {
    myGlobalVar: string;
  }
}

// Example 8: Declare a class
declare class LegacyLibrary {
  constructor(options: { debug: boolean });
  doSomething(value: string): number;
  static VERSION: string;
}

// Example 9: UMD module declaration
export as namespace MyUMDLib;
export = MyUMDLib;

declare namespace MyUMDLib {
  interface Options {
    debug: boolean;
    timeout: number;
  }

  function init(options: Options): void;
  function destroy(): void;

  const version: string;
}
