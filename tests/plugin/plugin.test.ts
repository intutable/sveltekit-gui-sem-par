import { Core, EventSystem } from "@intutable/core"
import * as path from "path"
import { RegisterComponentsRequest } from "../../src/plugin/types"

let events: EventSystem
let requestObject: RegisterComponentsRequest | undefined
let requestHandler: jest.Mock

beforeAll(async () => {
    events = new EventSystem()
    requestObject = undefined
    requestHandler = jest.fn(request => {
        requestObject = request
        return Promise.resolve({ success: true })
    })
})

describe("plugin registration", () => {
    test("sends registerComponents request", async () => {
        events.listenForRequests("gui-es", "registerComponents", requestHandler)
        await createCore()

        expect(requestHandler).toHaveBeenCalled()
    })

    test("registers plugin name", async () => {
        events.listenForRequests("gui-es", "registerComponents", requestHandler)
        await createCore()

        expect(requestObject?.plugin).toBe("sem-par-gui")
    })

    test("registers gui components", async () => {
        events.listenForRequests("gui-es", "registerComponents", requestHandler)
        await createCore()

        expect(requestObject?.components).toEqual(
            [
                {
                    name: "PluginComponent",
                    title: "SemPar",
                    dimensions: { minWidth: 20, minHeight: 12 }
                }
            ]
        )
    })
})

async function createCore() {
    await Core.create([path.join(__dirname, "../../")], events)
}
