<script lang="ts">
    import { createEventDispatcher } from "svelte"

    const dispatcher = createEventDispatcher()

    /**
     * Submits the entered query and fetches the suggestions from sem-par.
     * @param event submit event dispatched by the UI
     */
    async function onSubmit(event: SubmitEvent): Promise<void> {
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())
        dispatcher("submit", data.query)
    }

    /**
     * Clear the current suggestions when a new query is being entered.
     */
    async function onSearch(): Promise<void> {
        dispatcher("clear")
    }
</script>

<form class="form" on:search={onSearch} on:submit|preventDefault={onSubmit}>
    <input class="text-field" id="query" name="query" placeholder="Enter Query..." type="search">
    <br>
</form>

<style lang="sass">
  form
    display: flex
    padding: 0.5rem
    margin-bottom: 1.2rem
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
