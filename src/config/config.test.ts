import { config } from './index';

describe('config', () => {
  it('loads defaults and types are correct', () => {
    expect(typeof config.server.port).toBe('number');
    expect(typeof config.server.host).toBe('string');
    expect(typeof config.server.env).toBe('string');
    expect(typeof config.jwt.secret).toBe('string');
    expect(typeof config.rateLimit.max).toBe('number');
  });
});
