import { SupabaseAdapter } from './SupabaseAdapter';
import { createClient as createClientMock } from '@supabase/supabase-js';

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(),
}));

describe('SupabaseAdapter', () => {
  const mockSelect = jest.fn(async () => ({ data: [{ id: '1', name: 'foo' }], error: null }));
  const mockInsert = jest.fn(() => ({
    select: () => ({ single: async () => ({ data: { id: '2', name: 'bar' }, error: null }) }),
  }));
  const mockUpdate = jest.fn(() => ({
    eq: (_col: string, _val: string) => ({
      select: () => ({ single: async () => ({ data: { id: '2', name: 'baz' }, error: null }) }),
    }),
  }));
  const mockDelete = jest.fn(() => ({
    eq: (_col: string, _val: string) => (async () => ({ data: null, error: null }))(),
  }));

  const mockFrom = jest.fn((_table: string) => ({
    select: mockSelect,
    insert: mockInsert,
    update: mockUpdate,
    delete: mockDelete,
  }));

  const mockClient = { from: mockFrom } as any;

  beforeEach(() => {
    (createClientMock as jest.Mock).mockReturnValue(mockClient);
    jest.clearAllMocks();
  });

  it('connects and performs basic operations', async () => {
    const adapter = new SupabaseAdapter('https://supabase.test', 'anon-key');

    await adapter.connect();

    const rows = await adapter.query<{ id: string; name: string }>('SELECT * FROM users');
    expect(rows).toEqual([{ id: '1', name: 'foo' }]);
    expect(mockFrom).toHaveBeenCalledWith('users');

    const inserted = await adapter.insert('users', { name: 'bar' });
    expect(inserted).toEqual({ id: '2', name: 'bar' });

    const updated = await adapter.update('users', '2', { name: 'baz' });
    expect(updated).toEqual({ id: '2', name: 'baz' });

    await expect(adapter.delete('users', '2')).resolves.toBeUndefined();
    expect(mockDelete).toHaveBeenCalled();
  });

  it('throws on unsupported SQL', async () => {
    const adapter = new SupabaseAdapter('https://supabase.test', 'anon-key');
    await adapter.connect();
    await expect(adapter.query('DROP TABLE users')).rejects.toThrow('Unsupported SQL query');
  });
});
