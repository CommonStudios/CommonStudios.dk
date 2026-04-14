/** Development-friendly assertion that doubles as a type guard. */
export function invariant(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(`[invariant] ${message}`);
  }
}
