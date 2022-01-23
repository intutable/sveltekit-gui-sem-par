<script lang="ts">
    import { getContext } from "svelte"
    import { executeCodeSnippet, getSuggestions } from "./fetch"
    import InputField from "./inputField/InputField.svelte"
    import SuggestionContainer from "./suggestionContainer/SuggestionContainer.svelte"
    import type { RequestContext, RequestError, Suggestion } from "./types"

    const requestContext = getContext<RequestContext>("request")
    let suggestions: Suggestion[] | undefined = undefined

    async function onSubmit(event: CustomEvent): Promise<void> {
        const query = event.detail

        if (!query || typeof query !== "string") {
            return
        }

        try {
            const response = await getSuggestions(query, requestContext)
            suggestions = response.suggestions
        } catch (error: RequestError) {
            console.log(error.body.error)
        }
    }

    async function onClear(): Promise<void> {
        suggestions = undefined
    }

    async function onExecute(event: CustomEvent): Promise<void> {
        const suggestion: Suggestion = event.detail
        console.log(`Executing snippet: "${suggestion.snippet}"`)

        try {
            await executeCodeSnippet(suggestion.snippet, requestContext)
        } catch (error: RequestError) {
            console.log(error.body.error)
        }
    }
</script>

<div class="main-container">
    <InputField on:submit={onSubmit} on:clear={onClear} />
    {#if suggestions}
        <div class="divider"></div>
        <SuggestionContainer suggestions={suggestions} on:execute={onExecute} />
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
    margin: 1.2rem 0 0.6rem 0
</style>
