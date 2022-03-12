import type { CoreRequest, CoreResponse } from "@intutable/core"

export interface RequestContext {
    send: (request: CoreRequest, body: object) => Promise<CoreResponse>
}

export interface StoreContext {
    commitChanges: () => void
    tableNames: () => string[]
    refresh: () => void
    updateTable: (tableData: TableData) => void
}

export interface MenuContext {
    showContextMenu: (data: CustomContextMenuData) => void
}

export interface SidePanelContext {
    showActionSidePanel: (
        data: ActionSidePanelData,
        onExecute: (placeholders: Placeholder[]) => void | Promise<void>
    ) => void
}

export interface ActionSidePanelData {
    title: string
    subtitle?: string
    placeholders: Placeholder[]
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

export interface Suggestion {
    snippet: string
    score: number
}

export interface ExecuteCodeRequest {
    parametrizedCode: string
    placeholders?: Placeholder[]
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

export interface MenuItem extends Action {
    menu: string
}

export interface Action {
    name: string
    placeholders?: Placeholder[]
    request?: CoreRequest
    callback?: (action: Action, placeholders: Placeholder[]) => void | Promise<void>
    dispatchEvent?: string
}

export interface SimilarSuggestionsMenuItem extends MenuItem {
    query: string
    snippet: string
}

export interface Placeholder {
    variable: string
    name?: string
    type?: PlaceholderType
    fromContext?: string
    value?: string | number | boolean
}

export type PlaceholderType = "text" | "number" | "checkbox" | "date"

export interface PlaceholderRequest extends CoreRequest {
    placeholders?: Placeholder[]
}

export interface MousePosition {
    x: number
    y: number
}

export interface TableData {
    table: Table
    columns: Column[]
    rows: any[]
}

export interface Table {
    tableName: string
    tableId: number
}

export interface Column {
    _id: number
    name: string
    type: string
}
