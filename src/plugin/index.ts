import { PluginLoader } from "@intutable/core"
import { RegisterComponentsRequest } from "./types"

/**
 * Registers the sem-par-gui UI components in the gui-es plugin in Core.
 * @param {PluginLoader} plugins Plugin loader object from Core
 */
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
