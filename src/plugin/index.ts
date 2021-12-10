import { PluginLoader } from "@intutable/core"

export async function init(plugins: PluginLoader): Promise<void> {
    await plugins.request({
        channel: "gui-es",
        method: "registerUi",
        plugin: "sem-par-gui",
        components: ["PluginComponent"],
    })
}
