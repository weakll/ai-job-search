import { test, expect } from "bun:test";
import { runCLI, parseJSON } from "./helpers";

test("search with --bogus treated as query (not error)", async () => {
  const result = await runCLI(["search", "--bogus"]);
  expect(result.exitCode).toBe(0);
  const data = parseJSON(result.stdout);
  expect(data.meta).toBeDefined();
});

test("unknown command exits with error", async () => {
  const result = await runCLI(["bogus"]);
  expect(result.exitCode).toBe(1);
  const err = parseJSON(result.stderr);
  expect(err.error).toBeDefined();
});

test("help flag exits with 0", async () => {
  const result = await runCLI(["--help"]);
  expect(result.exitCode).toBe(0);
});

test("search returns results for Java query", async () => {
  const result = await runCLI(["search", "-q", "Java", "--limit", "2", "--format", "json"]);
  expect(result.exitCode).toBe(0);
  const data = parseJSON(result.stdout);
  expect(data.meta.count).toBeGreaterThan(0);
  expect(data.results.length).toBeGreaterThan(0);
  expect(data.results[0].title).toBeTruthy();
});
