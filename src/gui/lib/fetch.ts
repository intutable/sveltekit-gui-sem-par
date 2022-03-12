import type { CoreRequest } from "@intutable/core"
import type {
    ExecuteCodeRequest,
    ExecuteCodeResponse,
    Placeholder,
    RequestContext,
    SimilarSuggestionsRequest,
    SuggestionsRequest,
    SuggestionsResponse,
} from "./types"

/**
 * Fetch suggestions from the sem-par plugin given a user defined query.
 * @param query query for which suggestions should be generated
 * @param requestContext Svelte Context for making request calls
 */
export function getSuggestions(
    query: string,
    requestContext: RequestContext
): Promise<SuggestionsResponse> {
    console.log(`Get suggestions for: "${query}"`)

    const coreRequest: CoreRequest = {
        channel: "sem-par",
        method: "getSuggestions",
    }

    const request: SuggestionsRequest = {
        utterance: query,
        maxSuggestions: 10,
    }

    return requestContext.send(coreRequest, request) as Promise<SuggestionsResponse>
}

/**
 * Fetch similar suggestions from the sem-par plugin given a query and a snippet.
 * @param query query for which suggestions should be generated
 * @param snippet snippet for which suggestions should be generated
 * @param requestContext Svelte Context for making request calls
 */
export function getSimilarSuggestions(
    query: string,
    snippet: string,
    requestContext: RequestContext
): Promise<SuggestionsResponse> {
    console.log(`Get similar suggestions for: "${snippet}"`)

    const coreRequest: CoreRequest = {
        channel: "sem-par",
        method: "getSimilarSuggestions",
    }

    const request: SimilarSuggestionsRequest = {
        utterance: query,
        snippet: snippet,
        maxSuggestions: 10,
    }

    return requestContext.send(coreRequest, request) as Promise<SuggestionsResponse>
}

/**
 * Execute a code snippet using data-dan.
 * @param codeSnippet snippet to be executed
 * @param requestContext Svelte Context for making request calls
 * @param placeholders filled placeholders contained in code snippet
 */
export function executeCodeSnippet(
    codeSnippet: string,
    requestContext: RequestContext,
    placeholders?: Placeholder[]
): Promise<ExecuteCodeResponse> {
    console.log(`Executing snippet: "${codeSnippet}"`)

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "executeParametrizedCode",
    }

    const request: ExecuteCodeRequest = {
        parametrizedCode: codeSnippet,
        placeholders: placeholders ?? [],
    }

    return requestContext.send(coreRequest, request) as Promise<ExecuteCodeResponse>
}
