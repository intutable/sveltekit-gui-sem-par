import type { CoreRequest } from "@intutable/core"
import type { RequestContext, SuggestionsRequest, SuggestionsResponse } from "../types"

export async function getSuggestions(
    query: string,
    context: RequestContext
): Promise<SuggestionsResponse> {
    const coreRequest: CoreRequest = {
        channel: "sem-par",
        method: "getSuggestions"
    }

    const request: SuggestionsRequest = {
        utterance: query,
        maxSuggestions: 10
    }

    return context.send(coreRequest, request) as SuggestionsResponse
}
