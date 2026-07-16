import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges Tailwind classes correctly', () => {
    const result = cn('bg-red-500', 'text-white', 'bg-blue-500');
    expect(result).toContain('bg-blue-500');
    expect(result).toContain('text-white');
  });

  it('filters falsey values', () => {
    const result = cn('bg-red-500', false && 'text-white', null, undefined, 'text-black');
    expect(result).toBe('bg-red-500 text-black');
  });
});
