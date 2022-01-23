import type { CoreRequest } from "@intutable/core"
import type {
    ExecuteCodeRequest,
    ExecuteCodeResponse,
    RequestContext,
    SuggestionsRequest,
    SuggestionsResponse
} from "./types"

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

export async function executeCodeSnippet(
    codeSnippet: string,
    context: RequestContext
): Promise<ExecuteCodeResponse> {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "execute"
    }

    const request: ExecuteCodeRequest = {
        code: codeSnippet
    }

    return context.send(coreRequest, request) as ExecuteCodeResponse
}
