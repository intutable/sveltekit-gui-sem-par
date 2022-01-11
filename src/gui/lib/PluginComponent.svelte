<script lang="ts">
    import InputField from "./inputField/InputField.svelte"
    import SuggestionContainer from "./suggestionContainer/SuggestionContainer.svelte"
    import type { Suggestion } from "./types"

    let suggestions: Suggestion[] | undefined = undefined
</script>

<div class="main-container">
    <InputField bind:suggestions={suggestions} />
    {#if suggestions}
        <div class="divider"></div>
        <SuggestionContainer suggestions={suggestions} />
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
