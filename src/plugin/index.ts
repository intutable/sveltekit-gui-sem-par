import { PluginLoader } from "@intutable/core"
import { RegisterUiRequest } from "./types"

export async function init(plugins: PluginLoader): Promise<void> {
    const request: RegisterUiRequest = {
        channel: "gui-es",
        method: "registerUi",
        plugin: "sem-par-gui",
        components: [
            {
                name: "PluginComponent",
                title: "SemPar",
                dimensions: { minWidth: 20, minHeight: 12 }
            }
        ]
    }

    await plugins.request(request)
}
