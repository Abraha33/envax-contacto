
# Experiment Runbook

Every meaningful experiment must be recorded.

## Required fields

Each run must record:

* Run ID
* Date
* Git commit
* OpenCode version
* Model
* Model provider
* Vision support
* Node version
* Penpot version/environment
* Penpot MCP version
* Input reference
* Number of screens expected
* Number of screens detected
* Number of Penpot boards created
* Approximate editable-object count
* Components created
* QA result
* Failures
* Manual corrections
* Prompt/rule version
* Final verdict

## Verdict

Use only:

* PASS
* PARTIAL
* FAIL
* BLOCKED

## Evidence

A claim is not evidence.

Preferred evidence:

* generated files
* Penpot boards
* screenshots/exports
* command logs
* machine-readable manifests
* QA comparisons

## Benchmark principle

Use the same benchmark references when comparing prompt/model versions.

Do not change both the benchmark and the rules simultaneously unless documented.
