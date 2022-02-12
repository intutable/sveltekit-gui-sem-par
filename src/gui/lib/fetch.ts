import type { CoreRequest } from "@intutable/core"
import type {
    ExecuteCodeRequest,
    ExecuteCodeResponse,
    RequestContext,
    SimilarSuggestionsRequest,
    SuggestionsRequest,
    SuggestionsResponse
} from "./types"

export function getSuggestions(
    query: string,
    context: RequestContext
): Promise<SuggestionsResponse> {
    console.log(`Get suggestions for: "${query}"`)

    const coreRequest: CoreRequest = {
        channel: "sem-par",
        method: "getSuggestions"
    }

    const request: SuggestionsRequest = {
        utterance: query,
        maxSuggestions: 10
    }

    return context.send(coreRequest, request) as Promise<SuggestionsResponse>
}

export function getSimilarSuggestions(
    query: string,
    snippet: string,
    context: RequestContext
): Promise<SuggestionsResponse> {
    console.log(`Get similar suggestions for: "${snippet}"`)

    const coreRequest: CoreRequest = {
        channel: "sem-par",
        method: "getSimilarSuggestions"
    }

    const request: SimilarSuggestionsRequest = {
        utterance: query,
        snippet: snippet,
        maxSuggestions: 10
    }

    return context.send(coreRequest, request) as Promise<SuggestionsResponse>
}

export function executeCodeSnippet(
    codeSnippet: string,
    context: RequestContext
): Promise<ExecuteCodeResponse> {
    console.log(`Executing snippet: "${codeSnippet}"`)

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "execute"
    }

    const request: ExecuteCodeRequest = {
        code: codeSnippet
    }

    return context.send(coreRequest, request) as Promise<ExecuteCodeResponse>
}
