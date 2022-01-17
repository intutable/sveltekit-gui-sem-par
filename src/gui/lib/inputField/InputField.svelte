<script lang="ts">
    import { getContext } from "svelte"
    import type { RequestContext, RequestError, Suggestion } from "../types"
    import { getSuggestions } from "../fetch"

    export let suggestions: Suggestion[] | undefined = undefined

    const context: RequestContext = getContext("request")

    async function onSubmit(event): Promise<void> {
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())
        const query = data.query

        if (!query) {
            return
        }

        try {
            const response = await getSuggestions(query, context)
            suggestions = response.suggestions
        } catch (error: RequestError) {
            console.log(error.body.error)
        }
    }

    async function onSearch(): Promise<void> {
        suggestions = undefined
    }
</script>

<form class="form" on:submit|preventDefault={onSubmit} on:search={onSearch}>
    <input class="text-field" type="search" id="query" name="query" placeholder="Enter Query...">
    <br>
</form>

<style lang="sass">

  form
    display: flex
    padding: 0.5rem
    background: hsla(0, 0%, 0%, 0.05)
    border-radius: 6px

  input
    flex: 1
    font-size: 0.9rem
    background: transparent
    border: none
    outline: none

  input::placeholder
    color: darkgray
</style>
