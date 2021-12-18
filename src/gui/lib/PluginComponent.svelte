<script lang="ts">
    import InputField from "./inputField/InputField.svelte"
    import type { Suggestion } from "./types"

    let suggestions: Suggestion[] | undefined = undefined
</script>

<div class="main-container">
    <div class="title">SemPar</div>
    <InputField bind:suggestions={suggestions} />
</div>

<style lang="sass">
  @use "../style/theme"

  .main-container
    @extend .theme-plain
    display: flex
    flex-direction: column
    height: 20rem

  .title
    font-size: 1.1rem
    font-weight: bold
    margin: 0.5rem 0.3rem 0.5rem 0.3rem
    border: none

  .divider
    border-top: 2px solid rgba(0, 0, 0, 0.1)
    margin: 1.2rem 0 0.6rem 0
</style>
