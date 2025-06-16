import { lowerCaseInitial, splitCamelCase } from "./caseUtils";

export function withNameAffixes<T>(name: string, func: (affix: string) => T | undefined): T | undefined;
export function withNameAffixes<T>(name: string, func: (affix: string) => T | undefined, fallback: () => T): T;
export function withNameAffixes<T>(
  name: string,
  func: (affix: string) => T | undefined,
  fallback?: () => T
): T | undefined {
  // "camelCaseIdentifier" => ["camel", "Case", "Identifier"]
  const nameParts = splitCamelCase(name);

  do {
    // remove prefix words: "camelCaseIdentifier", "caseIdentifier", "identifier"
    for (const parts = nameParts.slice(); parts.length > 0; parts.shift()) {
      const affix = lowerCaseInitial(parts.join(""));
      const result = func(affix);
      if (result !== undefined) {
        return result;
      }
    }
    // remove suffix words: "camelCase", "camel"
    for (const parts = nameParts.slice(0, -1); parts.length > 0; parts.pop()) {
      const affix = lowerCaseInitial(parts.join(""));
      const result = func(affix);
      if (result !== undefined) {
        return result;
      }
    }
    // drop the first and last words and try with internal phrases
    nameParts.shift();
    nameParts.pop();
  } while (nameParts.length > 0);

  const result = fallback?.();
  return result;
}
