export function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function camelCaseToTitle(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}
