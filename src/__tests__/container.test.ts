import { Container } from '../shared/container/Container';

describe('Dependency Injection Container', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  afterEach(() => {
    container.clear();
  });

  describe('Service Registration', () => {
    it('should register and resolve a service instance', () => {
      const service = { name: 'TestService' };
      container.register('TestService', service);

      const resolved = container.resolve<typeof service>('TestService');

      expect(resolved).toBe(service);
      expect(resolved.name).toBe('TestService');
    });

    it('should register and resolve a factory service', () => {
      class TestService {
        getName() {
          return 'FactoryService';
        }
      }

      container.registerFactory('TestService', () => new TestService());

      const resolved = container.resolve<TestService>('TestService');

      expect(resolved).toBeInstanceOf(TestService);
      expect(resolved.getName()).toBe('FactoryService');
    });

    it('should return same instance on multiple resolves', () => {
      container.registerFactory('TestService', () => ({ id: Math.random() }));

      const first = container.resolve<{ id: number }>('TestService');
      const second = container.resolve<{ id: number }>('TestService');

      expect(first).toBe(second);
      expect(first.id).toBe(second.id);
    });

    it('should check if service exists', () => {
      container.register('ExistingService', {});

      expect(container.has('ExistingService')).toBe(true);
      expect(container.has('NonExistingService')).toBe(false);
    });

    it('should throw error when resolving non-existent service', () => {
      expect(() => {
        container.resolve('NonExistentService');
      }).toThrow('Service "NonExistentService" not found in container');
    });

    it('should clear all services', () => {
      container.register('Service1', {});
      container.register('Service2', {});

      expect(container.has('Service1')).toBe(true);
      expect(container.has('Service2')).toBe(true);

      container.clear();

      expect(container.has('Service1')).toBe(false);
      expect(container.has('Service2')).toBe(false);
    });
  });
});
