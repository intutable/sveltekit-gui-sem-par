<script lang="ts">
    import { LoadingIndicator, Output, OutputPanel, OutputType } from "@intutable/common-gui"
    import { getContext } from "svelte"
    import { executeCodeSnippet, getSimilarSuggestions, getSuggestions } from "./fetch"
    import InputField from "./inputField/InputField.svelte"
    import SuggestionContainer from "./suggestionContainer/SuggestionContainer.svelte"
    import type {
        CustomContextMenuData,
        MenuContext,
        Placeholder,
        RequestContext,
        RequestError,
        SidePanelContext,
        SimilarSuggestionsMenuItem,
        Suggestion
    } from "./types"

    const requestContext = getContext<RequestContext>("request")
    const menuContext = getContext<MenuContext>("menu")
    const sidePanelContext = getContext<SidePanelContext>("sidePanel")

    let query: string | undefined
    let suggestions: Suggestion[] | undefined
    let showLoadingIndicator = false
    let loadingTitle = ""
    let output: Output | undefined

    async function onSubmit(event: CustomEvent): Promise<void> {
        query = event.detail

        if (!query) {
            return
        }

        showLoadingIndicator = true
        loadingTitle = "Loading Suggestions"

        try {
            const response = await getSuggestions(query, requestContext)
            suggestions = response.suggestions
        } catch (error: RequestError) {
            onError(error)
            return
        }

        showLoadingIndicator = false
    }

    async function onExecute(event: CustomEvent): Promise<void> {
        showLoadingIndicator = true
        loadingTitle = "Executing Snippet"
        onClear()

        const snippet = event.detail.snippet
        const variables: string[] = snippet.match(/%.*?%/g)

        if (variables.length > 0) {
            const placeholders: Placeholder[] = variables.map(variable => {
                return { variable: variable, name: variable.replace(/%/g, "") }
            })
            sidePanelContext.showActionSidePanel(
                { title: "SemPar: Execute Code Snippet", subtitle: snippet, placeholders },
                async (placeholders: Placeholder[]) => {
                    await executeCodeSnippet(snippet, requestContext, placeholders)
                }
            )
            return
        }

        try {
            await executeCodeSnippet(snippet, requestContext)
        } catch (error) {
            onError(error)
            return
        }

        output = new Output(OutputType.Info, "Successfully executed code")
        showLoadingIndicator = false
    }

    async function onGetSimilarSuggestions(item: SimilarSuggestionsMenuItem): Promise<void> {
        showLoadingIndicator = true
        loadingTitle = "Loading Similar Suggestions"
        onClear()

        try {
            const response = await getSimilarSuggestions(item.query, item.snippet, requestContext)
            suggestions = response.suggestions
        } catch (error: RequestError) {
            onError(error)
            return
        }

        showLoadingIndicator = false
    }

    async function showContextMenu(event: CustomEvent): Promise<void> {
        const menuItem: SimilarSuggestionsMenuItem = {
            name: "Get similar suggestions",
            menu: "sem-par/suggestion",
            callback: onGetSimilarSuggestions,
            query: query,
            snippet: event.detail.snippet
        }

        const contextMenuData: CustomContextMenuData = {
            menu: "sem-par/suggestion",
            mousePosition: { x: 0, y: 0 },
            customItems: [menuItem]
        }

        menuContext.showContextMenu(contextMenuData)
    }

    function onClear(): void {
        suggestions = undefined
    }

    function onError(error: unknown): void {
        console.error(error)
        output = new Output(OutputType.Error, error.body?.error ?? `${error}`)
        showLoadingIndicator = false
    }
</script>

<div class="main-container">
    <InputField on:submit={onSubmit} on:clear={onClear} />
    {#if showLoadingIndicator}
        <LoadingIndicator title={loadingTitle} />
    {:else if suggestions}
        <div class="divider"></div>
        <SuggestionContainer
            suggestions={suggestions}
            on:execute={onExecute}
            on:showContextMenu={showContextMenu}
        />
    {:else if output}
        <OutputPanel {output} />
    {/if}
</div>

<style lang="sass">
  @use "../../node_modules/@intutable/common-gui/dist/style/theme"

  .main-container
    @extend .theme-plain
    display: flex
    flex-direction: column
    flex: 1

  .divider
    border-top: 2px solid rgba(0, 0, 0, 0.1)
    margin-bottom: 0.6rem
</style>
