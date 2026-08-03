// expo-router's testing-library/expect.d.ts ships empty (upstream typing gap),
// even though the matchers are registered at runtime via expect.extend().
// See node_modules/expo-router/build/testing-library/expect.js
declare namespace jest {
  interface Matchers<R> {
    toHavePathname(expected: string): R;
    toHavePathnameWithParams(expected: string): R;
    toHaveSegments(expected: string[]): R;
    toHaveSearchParams(expected: Record<string, string | string[]>): R;
    toHaveRouterState(expected: unknown): R;
  }
}
