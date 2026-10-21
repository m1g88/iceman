import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo root holds a second lockfile (local agent tooling), so Next can't
  // infer the workspace root and warns on every build. Pin tracing to this app.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
