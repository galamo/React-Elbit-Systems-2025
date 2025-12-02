// Exercise: TypeScript Type Declarations

/**
 * This exercise will help you practice creating type declarations.
 * Create .d.ts files as instructed below.
 */

/**
 * TASK 1: Create global.d.ts
 *
 * Declare the following global variables:
 * - APP_NAME: string
 * - APP_VERSION: string
 * - DEBUG_MODE: boolean
 *
 * Declare a global function:
 * - log(message: string, level: 'info' | 'warn' | 'error'): void
 */

// TODO: Create global.d.ts file
// TODO: Try using the global variables and function here

/**
 * TASK 2: Create window.d.ts
 *
 * Extend the Window interface to include:
 * - analytics: {
 *     track(event: string, data?: any): void;
 *     identify(userId: string): void;
 *   }
 * - config: {
 *     apiUrl: string;
 *     timeout: number;
 *   }
 */

// TODO: Create window.d.ts file
// TODO: Try using window.analytics and window.config here

/**
 * TASK 3: Create env.d.ts
 *
 * Extend NodeJS.ProcessEnv to include:
 * - NODE_ENV: 'development' | 'production' | 'test'
 * - API_URL: string
 * - API_KEY: string
 * - PORT: string
 * - DATABASE_URL: string
 */

// TODO: Create env.d.ts file
// TODO: Try accessing process.env with type safety

/**
 * TASK 4: Create my-library.d.ts
 *
 * Declare a module 'my-library' with:
 *
 * Interface LibraryConfig:
 * - apiKey: string
 * - timeout: number
 * - retries?: number
 *
 * Class LibraryClient:
 * - constructor(config: LibraryConfig)
 * - request(url: string): Promise<any>
 * - get(url: string): Promise<any>
 * - post(url: string, data: any): Promise<any>
 *
 * Function initialize:
 * - initialize(config: LibraryConfig): LibraryClient
 *
 * Constant VERSION: string
 */

// TODO: Create my-library.d.ts file
// TODO: Try importing and using the library

/**
 * TASK 5: Create assets.d.ts
 *
 * Declare module types for:
 * - '*.png' - should export default as string
 * - '*.jpg' - should export default as string
 * - '*.svg' - should export default as string
 * - '*.css' - should export default as { [key: string]: string }
 * - '*.json' - should export default as any
 */

// TODO: Create assets.d.ts file
// TODO: Try importing image and CSS files

/**
 * TASK 6: Create namespace.d.ts
 *
 * Declare a namespace 'Utils' with:
 *
 * Interface StringUtils:
 * - capitalize(str: string): string
 * - reverse(str: string): string
 * - truncate(str: string, length: number): string
 *
 * Interface NumberUtils:
 * - round(num: number, decimals: number): number
 * - random(min: number, max: number): number
 * - clamp(num: number, min: number, max: number): number
 *
 * Const PI: number
 * Const E: number
 */

// TODO: Create namespace.d.ts file
// TODO: Try using the Utils namespace

/**
 * TASK 7: Create jquery.d.ts (Simulating a library)
 *
 * Declare a module 'jquery' with:
 *
 * Interface JQuery:
 * - addClass(className: string): JQuery
 * - removeClass(className: string): JQuery
 * - text(): string
 * - text(content: string): JQuery
 * - on(event: string, handler: Function): JQuery
 *
 * Function $(selector: string): JQuery
 *
 * Namespace $:
 * - ajax(url: string, options?: any): Promise<any>
 * - get(url: string): Promise<any>
 * - post(url: string, data: any): Promise<any>
 */

// TODO: Create jquery.d.ts file
// TODO: Try using jQuery with type safety

/**
 * TASK 8: Create express-custom.d.ts
 *
 * Extend Express types:
 *
 * Extend Express.Request to include:
 * - user?: {
 *     id: number;
 *     email: string;
 *     role: 'admin' | 'user';
 *   }
 * - sessionId?: string
 *
 * Extend Express.Response to include:
 * - success(data: any): void
 * - error(message: string, code?: number): void
 */

// TODO: Create express-custom.d.ts file
// TODO: Demonstrate the extended types

/**
 * BONUS TASK: Create a complete library declaration
 *
 * Create chart-library.d.ts for a fictional charting library:
 *
 * Module 'chart-library':
 *
 * Type ChartType = 'line' | 'bar' | 'pie' | 'scatter'
 *
 * Interface ChartData:
 * - labels: string[]
 * - datasets: Array<{
 *     label: string;
 *     data: number[];
 *     backgroundColor?: string;
 *     borderColor?: string;
 *   }>
 *
 * Interface ChartOptions:
 * - responsive?: boolean
 * - maintainAspectRatio?: boolean
 * - title?: {
 *     display: boolean;
 *     text: string;
 *   }
 *
 * Class Chart:
 * - constructor(
 *     canvas: HTMLCanvasElement,
 *     config: {
 *       type: ChartType;
 *       data: ChartData;
 *       options?: ChartOptions;
 *     }
 *   )
 * - update(): void
 * - destroy(): void
 * - render(): void
 *
 * Export default Chart
 */

// TODO: Create chart-library.d.ts file
// TODO: Demonstrate using the Chart library

// Export to avoid errors
export {};
