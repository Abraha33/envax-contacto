
# Experiment Log

## EXP-000 — Environment bootstrap

Date: 2026-09-15 14:28:50

Status: BLOCKED

### Goal

Start Penpot MCP locally in preparation for the OpenCode → Penpot experiment.

### Environment

* Workspace: D:\test-envax-tools
* Node: v24.18.0
* Penpot MCP command: npx -y @penpot/mcp@latest

### Observed result

Penpot MCP did not start successfully.

Observed error:

`
ERR_PNPM_IGNORED_BUILDS
`

Build scripts were ignored for dependencies including:

* esbuild
* sharp

### Conclusion

No design-generation test has been performed yet.

The next experiment must establish a clean and reproducible Penpot MCP
environment before testing image → Penpot reconstruction.
