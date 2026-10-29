# Project diagrams

The diagrams for Portfolio, NixOS, Homelab and Edge IaC are generated with:

```sh
node scripts/generate-project-diagrams.mjs
```

All labels are English. The SVGs embed brand paths from the installed `simple-icons` package and require no third-party image requests. Brand marks belong to their owners; inclusion does not imply endorsement. Refer to the Simple Icons package license and each brand's usage guidelines.

The source generator owns these diagram files. Check its diagram descriptions against the corresponding `docs/<slug>-evidence.md` before changing a flow. A diagram describes the reviewed code or documented design; it is not a measurement of a live system.

Artifact Gateway uses the separately attributed official AWS Architecture Icons package; see its `icons/README.md`.
