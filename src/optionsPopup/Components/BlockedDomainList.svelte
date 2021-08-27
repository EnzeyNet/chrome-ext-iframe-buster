<script>
    import { getDomainsBlocked } from '../data/dataConnections'

    let blockedDomains = []
    getDomainsBlocked().then(
        (domains) => {
            blockedDomains = Array.from(domains).sort()
        }
    )
</script>

<div>
    {#each blockedDomains as domain}
        <div>
        {domain}
        </div>
    {/each}
</div>

<style>
</style>
