<script>
    import AllowedDomainList from './Components/AllowedDomainList.svelte'
    import BlockedDomainList from './Components/BlockedDomainList.svelte'
</script>

<main>
    <h3>Blocked</h3>
    <BlockedDomainList />
    <h3>Allowed</h3>
    <AllowedDomainList />
</main>

<style>
</style>
