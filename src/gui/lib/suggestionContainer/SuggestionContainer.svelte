<script lang="ts">
    import type { Suggestion } from "../types"

    export let suggestions: Suggestion[] | undefined = undefined

    async function onSuggestionClick(suggestion: Suggestion): Promise<void> {
        console.log(`Executing snippet: "${suggestion.snippet}"`)
    }
</script>

{#if suggestions?.length === 0}
    <div class="no-results">No suggestions were found.<br>Please try another query.</div>
{:else}
    <div class="header">
        <span>Snippet</span>
        <span>Score</span>
    </div>

    <div class="suggestion-container">
        {#each suggestions as suggestion}
            <div class="suggestion" on:click={onSuggestionClick(suggestion)}>
                <div class="snippet">{suggestion.snippet}</div>
                <div class="score">{suggestion.score}</div>
            </div>
        {/each}
    </div>
{/if}

<style lang="sass">
  @use "../../style/util"

  .no-results
    @extend .center-content
    color: hsla(0, 0%, 0%, 0.5)
    line-height: 1.5rem

  .header
    display: flex
    justify-content: space-between
    padding: 0 0.3rem 0 0.3rem
    font-weight: bold

  .suggestion-container
    margin-top: 0.5rem
    overflow-y: auto

  .suggestion
    @extend .rounded-border
    display: grid
    grid-template-columns: 1fr 3rem

  .suggestion:not(:first-child)
    margin-top: 0.6rem

  .suggestion:hover
    background-color: #bbbbbb
    cursor: pointer

  .snippet, .score
    padding: 0.3rem

  .snippet
    grid-column: 1
    word-break: break-all

  .score
    grid-column: 2
    text-align: end
</style>
