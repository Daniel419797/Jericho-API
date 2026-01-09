/**
 * Simple Dependency Injection Container
 * Manages service registration and resolution
 */
export class Container {
  private services: Map<string, unknown> = new Map();
  private factories: Map<string, () => unknown> = new Map();

  /**
   * Register a service instance
   */
  register<T>(name: string, instance: T): void {
    this.services.set(name, instance);
  }

  /**
   * Register a factory function for lazy initialization
   */
  registerFactory<T>(name: string, factory: () => T): void {
    this.factories.set(name, factory);
  }

  /**
   * Resolve a service by name
   */
  resolve<T>(name: string): T {
    // Check if instance already exists
    if (this.services.has(name)) {
      return this.services.get(name) as T;
    }

    // Check if factory exists and create instance
    if (this.factories.has(name)) {
      const factory = this.factories.get(name);
      if (!factory) {
        throw new Error(`Service "${name}" factory is undefined`);
      }
      const instance = factory();
      this.services.set(name, instance);
      return instance as T;
    }

    throw new Error(`Service "${name}" not found in container`);
  }

  /**
   * Check if a service is registered
   */
  has(name: string): boolean {
    return this.services.has(name) || this.factories.has(name);
  }

  /**
   * Clear all registered services
   */
  clear(): void {
    this.services.clear();
    this.factories.clear();
  }
}

// Export singleton instance
export const container = new Container();
