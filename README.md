# D1 project

A minimal TypeScript browser project for CMPM 121, Fall 2026. The official D1 specification is in the separate course Google Doc. Replace this introduction with your team's project description.

- **Team:** add your team credits here.
- **Deployed app:** add your GitHub Pages URL here.
- **Walkthrough:** add your walkthrough link here when available.

## Launch and check

Create your team's repository with **Use this template → Create a new repository**, then clone that repository. Install [Git](https://git-scm.com/downloads), [Deno 2.9.7](https://docs.deno.com/runtime/getting_started/installation/), and optionally VS Code with its recommended Deno extension.

Run these commands from your clone:

```sh
deno task setup
deno task dev
```

Setup enables the pre-commit checks once per clone, including on Windows. Open the local address printed by Vite and start editing `src/main.ts` and `index.html`.

```sh
deno task ci
deno task preview
```

`ci` checks formatting, lint, and TypeScript, then builds `dist/` with Vite 8.3.1. The same checks run before commits and in GitHub Actions. Use `deno task fmt` to fix formatting. There is no game-specific test suite yet: test your interactions in the browser, including the production preview. Preview serves the most recent build locally; it does not rebuild or publish it.

## Deploy

In your repository's **Settings → Pages**, set **Source** to **GitHub Actions**. Enable Actions if needed, then push to `main` (or run the workflow manually). The workflow checks and builds the project, uploads **only `dist/`**, and deploys that artifact to Pages. Follow the deployment URL in Actions and test the published app.

Project Pages URLs look like `https://<owner>.github.io/<repository>/`. The workflow supplies the actual repository name as `REPO_NAME`, and `vite.config.js` uses it as Vite's `base`. You can choose your own repository name; no template-name prefix needs editing. Local builds default to `/`.

To test a production build under a non-root path on any platform:

```sh
deno task build --base=/my-team-project/
deno task preview --base=/my-team-project/
```

Open `http://localhost:4173/my-team-project/` (or the port printed by preview). This simulates a repository prefix; the actual Pages deployment is still a separate step.

## Example asset

`src/assets/tile.svg` is a tiny original drawing used visibly by `src/main.ts`. Importing it returns a URL, which is assigned to the image's `src`. The `?no-inline` suffix keeps this small SVG as a separate hashed file so you can inspect its request in the browser's Network panel. Without that suffix, Vite may inline small assets as data URLs. The adjacent `@deno-types` annotation describes the imported URL as a string for Deno's checker.

Use asset imports rather than putting hardcoded `/src/...` or `/assets/...` strings into runtime code. Source paths disappear in the build, and a leading `/` points to the host root instead of the repository prefix. Vite rewrites imported URLs for the configured base. The `/src/main.ts` script entry in `index.html` is different: Vite processes that entry when building the HTML.

See Vite's authoritative [Static Asset Handling](https://vite.dev/guide/assets), [Public Base Path](https://vite.dev/guide/build#public-base-path), and [Static Deployment](https://vite.dev/guide/static-deploy) documentation. Replace the tile with your own assets as your project develops.

## Credits

Add credits and source/license links for your team's assets and borrowed material here.

Starter tooling adapted from [CMPM 121 Fall 2026 S01 starter](https://github.com/ucsc-cmpm-121-f26/s01-starter/tree/8974888efb6537be82e8eb069db139ea885039da). The baseline did not include an explicit repository license; this starter does not assign a new license to that material. The tile SVG and D1 scaffold were authored for this starter with OpenAI GPT-6 Astra assistance. Dependencies retain their respective licenses.
