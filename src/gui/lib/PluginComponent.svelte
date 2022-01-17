<script lang="ts">
    import { getContext, onMount, SvelteComponent } from "svelte"
    import { executeCodeSnippet, getSuggestions } from "./fetch"
    import InputField from "./inputField/InputField.svelte"
    import SuggestionContainer from "./suggestionContainer/SuggestionContainer.svelte"
    import type { CommonUiContext, RequestContext, Suggestion } from "./types"
    import { Output, OutputType, RequestError } from "./types"

    const requestContext = getContext<RequestContext>("request")
    const commonUiContext = getContext<CommonUiContext>("commonUi")
    let suggestions: Suggestion[] | undefined = undefined
    let loadingIndicator: SvelteComponent
    let showLoadingIndicator = false
    let loadingTitle = ""
    let outputPanel: SvelteComponent
    let output = undefined

    onMount(async () => {
        loadingIndicator = commonUiContext.getLoadingIndicator()
        outputPanel = commonUiContext.getOutputPanel()
    })

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
        <svelte:component this={loadingIndicator} title={loadingTitle} />
    {:else if suggestions}
        <div class="divider"></div>
        <SuggestionContainer suggestions={suggestions} on:execute={onExecute} />
    {:else if output}
        <svelte:component this={outputPanel} {output} />
    {/if}
</div>

<style lang="sass">
  @use "../style/theme"

  .main-container
    @extend .theme-plain
    display: flex
    flex-direction: column
    flex: 1

  .divider
    border-top: 2px solid rgba(0, 0, 0, 0.1)
    margin-bottom: 0.6rem
</style>
