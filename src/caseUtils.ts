import pluralize from "pluralize";

export function splitCamelCase(s: string): string[] {
  return s.split(/(?=[A-Z])/);
}

export function lowerCaseInitial(s: string): string {
  return s.charAt(0).toLowerCase() + s.substring(1);
}

export function upperCaseInitial(s: string): string {
  return s.charAt(0).toUpperCase() + s.substring(1);
}

export function singularCamelCase(s: string): string {
  const parts = splitCamelCase(s);
  const last = parts.pop();
  if (last) {
    const lastSingular = pluralize.singular(last);
    return parts.join("") + lastSingular;
  }
  return s;
}
