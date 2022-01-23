<script lang="ts">
    import { createEventDispatcher } from "svelte"

    const dispatcher = createEventDispatcher()

    async function onSubmit(event): Promise<void> {
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())
        dispatcher("submit", data.query)
    }

    async function onSearch(): Promise<void> {
        dispatcher("clear")
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
