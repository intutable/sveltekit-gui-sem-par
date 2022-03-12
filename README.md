# SemPar GUI Components

This is a library for GUI Svelte components used in the [xTable] project for the [SemPar][sem-par] plugin.  
The library adds the functionality of SemPar to the main GUI of xTable ([sveltekit-gui]).

## 🔧 Project Setup
### Main Setup

1. Clone the repository: `git clone https://gitlab.com/intutable/gui-svelte/sem-par-gui.git`
2. Change directory:`cd sem-par-gui`
3. Install dependencies: `npm install`

## 🏃 Usage

Install the `@intutable/sem-par-gui` package with the following command:

```
npm install @intutable/sem-par-gui
```

If you include this repository locally in your main project for testing, run the following command to build the Svelte package:

```
npm run build
```

## 👥 Contributing
This project adheres to the [xTable development guidelines][development-guidelines]. If you want to add or change code, the basic procedure is this:

1. Open an issue describing what you want to do (e.g. `fix: don't crash on negative integer input`).
2. Create a feature branch (e.g. `fix/dont-crash-on-negative-integer-input`) for the issue.
3. Open a merge request for the feature branch and mark it as draft.
4. As soon as you're done, mark the merge request as ready.
5. A reviewer will approve the merge request (or ask for changes).
6. Finally, the merge request is merged into `develop`.

### New Components
If you want to create new components, just create a new directory under `src/gui/lib/` and place your Svelte components there:

    sem-par-gui
    ├── src
    │   ├── gui
    │   │   ├── lib
    │   │   │    ├── yourCustomComponentDirectory
    │   │   │    │    ├── yourCustomComponent.svelte
    │   │   │    │    ├── ...
    │   │   │    ├── style
    │   │   │    │    ├── yourCustomStyle.sass
    │   │   │    │    ├── ...
    │   │   │    ├── index.ts
    │   │   │    ├── ...
    │   ├── plugin
    │   │   ├── index.ts
    │   │   ├── types.ts
    ├── ...

You then have to register the components in `src/plugin/index.ts` according to the README of [sveltekit-gui]:

```ts
import { PluginLoader } from "@intutable/core"

export async function init(plugins: PluginLoader): Promise<void> {
    const request: RegisterComponentsRequest = {
        channel: "gui-es",
        method: "registerComponents",
        plugin: "sem-par-gui",
        components: [
            {
                name: "PluginComponent",
                title: "SemPar",
                dimensions: { minWidth: 20, minHeight: 12 },
            },
        ],
    }

    await plugins.request(request)
}
```

The components will then be loaded in the `PluginSidePanel` of [sveltekit-gui].

## 🏁 Release strategy
This project uses [Semantic Versioning][semver]. Releases are available in the [xTable Package Registry][sem-par-gui-packages] and created automatically from the `main` branch.

To release a version, first open a MR from a feature branch to `develop` that increases the version number and have it approved and merged. Then, open a MR from `develop` to `main` and have it approved and merged by one of the xTable administrators.

## ⚖️ License
This plugin is licensed under the [Apache License, Version 2.0][apache2].

[xTable]: https://gitlab.com/intutable
[sem-par]: https://gitlab.com/intutable/sem-par
[sveltekit-gui]: https://gitlab.com/intutable/sveltekit-gui
[development-guidelines]: https://intutable.gitlab.io/intutable/contributing/
[semver]: https://semver.org
[sem-par-gui-packages]: https://gitlab.com/groups/intutable/-/packages?type=&orderBy=name&sort=desc&search[]=%40intutable%2Fsem-par-gui&search[]=
[apache2]: https://www.apache.org/licenses/LICENSE-2.0
