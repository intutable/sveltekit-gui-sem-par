import type { CoreRequest, CoreResponse } from "@intutable/core"

export interface RequestContext {
    send: (request: CoreRequest, body: object) => Promise<CoreResponse>
}

export interface MenuContext {
    showContextMenu: (data: CustomContextMenuData) => void
}

export interface Suggestion {
    snippet: string
    score: number
}

export interface SuggestionsRequest {
    utterance: string
    maxSuggestions: number
}

export interface SimilarSuggestionsRequest extends SuggestionsRequest {
    snippet: string
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

export interface CustomContextMenuData extends MenuData {
    menu: string
}

export interface MenuData {
    mousePosition: MousePosition
    customItems: MenuItem[]
}

export interface MenuItem {
    name: string
    menu: string
    request?: CoreRequest
    callback?: (item: MenuItem, placeholders: Placeholders) => void
    placeholders?: Placeholder[]
}

export interface SimilarSuggestionsMenuItem extends MenuItem {
    query: string
    snippet: string
}

export type Placeholders = { [key: string]: string | number | boolean }

export interface Placeholder {
    variable: string
    name?: string
    type?: PlaceholderType
    fromContext?: string
    value?: string | number | boolean
}

export type PlaceholderType = "text" | "number" | "checkbox" | "date"

export interface MousePosition {
    x: number
    y: number
}

export interface RequestError extends Error {
    body: object
}
