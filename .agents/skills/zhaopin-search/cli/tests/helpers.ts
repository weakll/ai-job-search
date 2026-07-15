import { test, expect } from "bun:test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_PATH = path.resolve(__dirname, "../src/cli.ts");

interface RunCLIResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

async function collectStream(stream: ReadableStream | null): Promise<string> {
  if (!stream) return "";
  const reader = stream.getReader();
  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += new TextDecoder().decode(value);
  }
  return result;
}

export async function runCLI(args: string[], timeout = 30000): Promise<RunCLIResult> {
  const proc = Bun.spawn(["bun", "run", CLI_PATH, ...args], {
    stdout: "pipe",
    stderr: "pipe",
  });

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => { proc.kill(); reject(new Error("Timeout")); }, timeout)
  );

  const stdoutPromise = collectStream(proc.stdout);
  const stderrPromise = collectStream(proc.stderr);
  const exitPromise = proc.exited;

  const [stdout, stderr, exitCode] = await Promise.race([
    Promise.all([stdoutPromise, stderrPromise, exitPromise]),
    timeoutPromise,
  ]);

  return { stdout, stderr, exitCode };
}

export function parseJSON<T>(output: string): T {
  return JSON.parse(output) as T;
}
