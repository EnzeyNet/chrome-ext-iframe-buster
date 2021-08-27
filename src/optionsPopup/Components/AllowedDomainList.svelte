<script>
    import { getDomainsAllowed } from '../data/dataConnections'

    let allowedDomains = []
    getDomainsAllowed().then(
        (domains) => {
            allowedDomains = Array.from(domains).sort()
        }
    )
</script>

<div>
    {#each allowedDomains as domain}
        <div>
        {domain}
        </div>
    {/each}
</div>

<style>
</style>
