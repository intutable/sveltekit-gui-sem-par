import type { CoreRequest, CoreResponse } from "@intutable/core"

export interface RequestContext {
    send: (request: CoreRequest, body: object) => CoreResponse
}

export interface Suggestion {
    snippet: string
    score: number
}

export interface SuggestionsRequest {
    utterance: string
    maxSuggestions: number
}

export interface SuggestionsResponse extends CoreResponse {
    suggestions: Suggestion[]
}

export interface ExecuteCodeRequest {
    code: string
}

export interface ExecuteCodeResponse extends CoreResponse {
    message: string
    output: string
    data: object[]
}

export interface RequestError extends Error {
    body: object
}

