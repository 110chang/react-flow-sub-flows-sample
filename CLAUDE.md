# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start Vite dev server (localhost:5173)
npm run build    # production build
npm run preview  # preview the production build
```

There is no test suite or linter configured.

## Architecture

This is a minimal React Flow ("@xyflow/react" v12) demo of sub-flows (parent/child node groups). The entire app lives in five flat files:

- **`nodes.js`** — exports `initialNodes`: the static node definitions. Group nodes use `type: 'group'`; child nodes reference the group via `parentId` and use `extent: 'parent'` to be constrained inside it.
- **`edges.js`** — exports `initialEdges`: the static edge definitions connecting node ids.
- **`App.tsx`** — the `Flow` component. Owns `nodes` and `edges` state and wires the three standard React Flow change handlers (`onNodesChange`, `onEdgesChange`, `onConnect`).
- **`index.jsx`** — React entry point; mounts `<App />` into `#app`.
- **`index.css`** — global styles.

### Sub-flow (group) pattern

A node becomes a container by setting `type: 'group'` and giving it an explicit `style.width`/`style.height`. Child nodes opt into the group by setting:

```js
parentId: '<group-node-id>',
extent: 'parent',   // keeps the child from being dragged outside the group
```

The group node itself is rendered as a plain styled `<div>`; children render inside it at coordinates relative to the group's top-left corner.
