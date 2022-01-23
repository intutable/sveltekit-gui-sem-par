<script lang="ts">
    import { LoadingIndicator, Output, OutputPanel, OutputType } from "@intutable/common-gui"
    import { getContext } from "svelte"
    import { executeCodeSnippet, getSuggestions } from "./fetch"
    import InputField from "./inputField/InputField.svelte"
    import SuggestionContainer from "./suggestionContainer/SuggestionContainer.svelte"
    import type { RequestContext, RequestError, Suggestion } from "./types"

    const requestContext = getContext<RequestContext>("request")
    let suggestions: Suggestion[] | undefined = undefined
    let showLoadingIndicator = false
    let loadingTitle = ""
    let output = undefined

    async function onSubmit(event: CustomEvent): Promise<void> {
        const query = event.detail

        if (!query) {
            return
        }

        console.log(`Get suggestions for: "${query}"`)
        showLoadingIndicator = true
        loadingTitle = "Loading Suggestions"

        try {
            const response = await getSuggestions(query, requestContext)
            suggestions = response.suggestions
        } catch (error: RequestError) {
            console.log(error.body.error)
        }

        showLoadingIndicator = false
    }

    function onClear(): void {
        suggestions = undefined
    }

    async function onExecute(event: CustomEvent): Promise<void> {
        const suggestion: Suggestion = event.detail

        console.log(`Executing snippet: "${suggestion.snippet}"`)
        showLoadingIndicator = true
        loadingTitle = "Executing Snippet"
        onClear()

        try {
            const response = await executeCodeSnippet(suggestion.snippet, requestContext)

            const message = response.message.charAt(0).toUpperCase() + response.message.slice(1)
            output = new Output(OutputType.Info, message)
        } catch (error: RequestError) {
            const message = await error.body.error
            output = new Output(OutputType.Error, message)
        }

        showLoadingIndicator = false
    }
</script>

<div class="main-container">
    <InputField on:submit={onSubmit} on:clear={onClear} />
    {#if showLoadingIndicator}
        <LoadingIndicator title={loadingTitle} />
    {:else if suggestions}
        <div class="divider"></div>
        <SuggestionContainer suggestions={suggestions} on:execute={onExecute} />
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
