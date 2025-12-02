// Live Example: Plugin System with Interface Merging

console.log("🔌 Plugin System with Interface Merging\n");
console.log("========================================\n");

// ============================================
// CORE SYSTEM
// ============================================

// Base Application Interface
interface Application {
  name: string;
  version: string;
  start(): void;
}

// Base Plugin Interface
interface Plugin {
  name: string;
  version: string;
  initialize(): void;
}

// ============================================
// PLUGIN 1: Authentication Plugin
// ============================================

// Extend Application interface with auth capabilities
interface Application {
  currentUser?: {
    id: number;
    username: string;
    role: string;
  };
  login(username: string, password: string): boolean;
  logout(): void;
}

// Extend Plugin interface with auth-specific properties
interface Plugin {
  authEndpoint?: string;
  tokenExpiry?: number;
}

// ============================================
// PLUGIN 2: Logging Plugin
// ============================================

// Extend Application interface with logging capabilities
interface Application {
  logs: string[];
  log(message: string, level: "info" | "warn" | "error"): void;
  getLogs(): string[];
}

// Extend Plugin interface with logging-specific properties
interface Plugin {
  logLevel?: "info" | "warn" | "error";
  maxLogs?: number;
}

// ============================================
// PLUGIN 3: Analytics Plugin
// ============================================

// Extend Application interface with analytics
interface Application {
  analytics: {
    pageViews: number;
    uniqueVisitors: number;
    events: Array<{ name: string; timestamp: Date }>;
  };
  trackEvent(eventName: string): void;
  getAnalytics(): object;
}

// Extend Plugin interface with analytics-specific properties
interface Plugin {
  trackingId?: string;
  anonymizeData?: boolean;
}

// ============================================
// IMPLEMENTATION
// ============================================

// Create the application with all merged capabilities
const myApp: Application = {
  // Core properties
  name: "MyAwesomeApp",
  version: "1.0.0",

  // Auth properties (from Plugin 1)
  currentUser: undefined,

  // Logging properties (from Plugin 2)
  logs: [],

  // Analytics properties (from Plugin 3)
  analytics: {
    pageViews: 0,
    uniqueVisitors: 0,
    events: [],
  },

  // Core method
  start() {
    console.log(`🚀 Starting ${this.name} v${this.version}...`);
    this.log("Application started", "info");
  },

  // Auth methods (from Plugin 1)
  login(username: string, password: string): boolean {
    // Simplified login logic
    if (username && password) {
      this.currentUser = {
        id: 1,
        username: username,
        role: "user",
      };
      this.log(`User ${username} logged in`, "info");
      this.trackEvent("user_login");
      return true;
    }
    this.log("Login failed", "error");
    return false;
  },

  logout() {
    if (this.currentUser) {
      const username = this.currentUser.username;
      this.currentUser = undefined;
      this.log(`User ${username} logged out`, "info");
      this.trackEvent("user_logout");
    }
  },

  // Logging methods (from Plugin 2)
  log(message: string, level: "info" | "warn" | "error") {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    this.logs.push(logEntry);
    console.log(logEntry);
  },

  getLogs(): string[] {
    return this.logs;
  },

  // Analytics methods (from Plugin 3)
  trackEvent(eventName: string) {
    this.analytics.events.push({
      name: eventName,
      timestamp: new Date(),
    });
    this.log(`Event tracked: ${eventName}`, "info");
  },

  getAnalytics(): object {
    return {
      pageViews: this.analytics.pageViews,
      uniqueVisitors: this.analytics.uniqueVisitors,
      totalEvents: this.analytics.events.length,
      recentEvents: this.analytics.events.slice(-5),
    };
  },
};

// Create plugins with all merged properties
const authPlugin: Plugin = {
  name: "AuthPlugin",
  version: "1.0.0",
  authEndpoint: "https://api.example.com/auth",
  tokenExpiry: 3600,

  initialize() {
    console.log(`✅ ${this.name} initialized`);
    console.log(`   Auth endpoint: ${this.authEndpoint}`);
    console.log(`   Token expiry: ${this.tokenExpiry}s`);
  },
};

const loggingPlugin: Plugin = {
  name: "LoggingPlugin",
  version: "1.0.0",
  logLevel: "info",
  maxLogs: 1000,

  initialize() {
    console.log(`✅ ${this.name} initialized`);
    console.log(`   Log level: ${this.logLevel}`);
    console.log(`   Max logs: ${this.maxLogs}`);
  },
};

const analyticsPlugin: Plugin = {
  name: "AnalyticsPlugin",
  version: "1.0.0",
  trackingId: "UA-123456-1",
  anonymizeData: true,

  initialize() {
    console.log(`✅ ${this.name} initialized`);
    console.log(`   Tracking ID: ${this.trackingId}`);
    console.log(`   Anonymize: ${this.anonymizeData}`);
  },
};

// ============================================
// RUN THE EXAMPLE
// ============================================

console.log("📦 Initializing Plugins:");
console.log("========================\n");

authPlugin.initialize();
loggingPlugin.initialize();
analyticsPlugin.initialize();

console.log("\n🎯 Running Application:");
console.log("======================\n");

// Start the application
myApp.start();

console.log();

// Test authentication
console.log("🔐 Testing Authentication:");
console.log("=========================\n");
myApp.login("john_doe", "password123");

console.log();

// Track some events
console.log("📊 Tracking Events:");
console.log("==================\n");
myApp.trackEvent("page_view");
myApp.trackEvent("button_click");
myApp.trackEvent("form_submit");

console.log();

// Get analytics
console.log("📈 Analytics Summary:");
console.log("====================");
console.log(JSON.stringify(myApp.getAnalytics(), null, 2));

console.log();

// Logout
console.log("👋 Logging Out:");
console.log("===============\n");
myApp.logout();

console.log();

// Show all logs
console.log("📝 Application Logs:");
console.log("===================");
myApp.getLogs().forEach((log) => console.log(log));

console.log("\n✨ Example Complete!");

export { Application, Plugin, myApp };
