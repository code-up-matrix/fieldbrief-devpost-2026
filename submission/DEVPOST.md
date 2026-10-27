# FieldBrief

Handover briefs with traceable evidence and visible unknowns.

DRAFT — not submitted. Event: https://nebiusglobalaihackathon.devpost.com/

## Inspiration

Operational handovers often flatten conflicting notes into a confident summary. FieldBrief keeps the evidence identifiers and unresolved observations in view so a reviewer can inspect the basis of the handover.

## What it does

Accepts labeled evidence, requests a structured brief from an available NVIDIA model through Nebius Token Factory, rejects references to unknown evidence IDs, and saves an owned record that can be exported or deleted.

## How it was built

Next.js and TypeScript provide the interface and API. Server-side input and output validation surround the Nebius request. PostgreSQL stores workspace-owned results with expiry, while signed cookies and same-origin checks protect mutations.

## Challenges

A valid citation identifier does not prove the model interpreted its source correctly. The implementation rejects unsupported identifiers and preserves unknowns; semantic review remains a human responsibility.

## What is verified

The local suite verifies provider request shape, NVIDIA model availability checks, duplicate evidence rejection, citation validation, record ownership and cleanup. Live sponsor execution is still pending.

## Technical lessons

Evidence traceability and truth are separate properties. Both must be represented honestly in the interface and the demonstration.

## Next steps

Connect the event credentials, run a real NVIDIA inference on Nebius, verify the deployed flow and record the result with its provider/model identifier.

## Judging requirements

Demonstrates a concrete operational use of Nebius and an NVIDIA model, with a reviewable evidence workflow. Actual provider execution and judging access must be shown before submitting.

## Demo sequence

1. Label the input notes as synthetic and show one contradiction.
2. Run the configured NVIDIA model through Nebius.
3. Inspect claims, evidence IDs and unresolved items.
4. Export and reopen the saved record; demonstrate an honest error path.

## Authorship

Prepared with ChatGPT/Codex assistance. Shared Next.js/workspace infrastructure originates in code-up-matrix/axios-fx-compliance-agent; the product module was developed on 27 October 2026. Shared code must be disclosed under the event’s reuse rules.

## Outstanding artifacts

Repository: https://github.com/code-up-matrix/fieldbrief-devpost-2026. The deployed demo URL, required video, private judge access and entrant declarations must be completed from real outputs. No success receipt is claimed.
