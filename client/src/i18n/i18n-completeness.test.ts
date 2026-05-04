/**
 * Property 3: 国际化翻译 key 完整性
 * 
 * For any 翻译 key 存在于中文简体（zh-CN）翻译文件中，
 * 该 key 也必须存在于中文繁体（zh-TW）和英文（en）翻译文件中，且对应值为非空字符串。
 * 
 * **Validates: Requirements 7.2**
 */
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import zhCN from './zh-CN.json';
import zhTW from './zh-TW.json';
import en from './en.json';

type TranslationValue = string | number | boolean | null | TranslationObject | TranslationValue[];
interface TranslationObject {
  [key: string]: TranslationValue;
}

/**
 * Recursively extracts all leaf key paths from a nested object.
 */
function getAllKeys(obj: TranslationObject, prefix = ''): string[] {
  const keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeys(value as TranslationObject, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

/**
 * Retrieves a nested value by dot-separated key path.
 */
function getNestedValue(obj: TranslationObject, keyPath: string): TranslationValue | undefined {
  const parts = keyPath.split('.');
  let current: TranslationValue = obj;
  for (const part of parts) {
    if (typeof current !== 'object' || current === null || Array.isArray(current)) {
      return undefined;
    }
    current = (current as TranslationObject)[part];
  }
  return current;
}

describe('Property 3: 国际化翻译 key 完整性', () => {
  const allZhCNKeys = getAllKeys(zhCN as unknown as TranslationObject);

  it('zh-CN should have translation keys', () => {
    expect(allZhCNKeys.length).toBeGreaterThan(0);
  });

  it('every zh-CN key exists in zh-TW with a non-empty value', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allZhCNKeys),
        (key: string) => {
          const value = getNestedValue(zhTW as unknown as TranslationObject, key);
          if (typeof value === 'string') {
            return value.trim().length > 0;
          }
          // Non-string leaf values (arrays, numbers) are acceptable
          return value !== undefined && value !== null;
        }
      ),
      { numRuns: allZhCNKeys.length }
    );
  });

  it('every zh-CN key exists in en with a non-empty value', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allZhCNKeys),
        (key: string) => {
          const value = getNestedValue(en as unknown as TranslationObject, key);
          if (typeof value === 'string') {
            return value.trim().length > 0;
          }
          // Non-string leaf values (arrays, numbers) are acceptable
          return value !== undefined && value !== null;
        }
      ),
      { numRuns: allZhCNKeys.length }
    );
  });
});
