/** Exhaustiveness check for discriminated unions. */
export function assertNever(x: never, message = 'Unexpected branch'): never {
  throw new Error(`${message}: ${JSON.stringify(x)}`);
}
