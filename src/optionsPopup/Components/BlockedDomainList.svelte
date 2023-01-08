<script>
    import {
		getDomainsBlocked,
		getPageDomain,
		setDomainAllowed,
	} from '../data/dataConnections'

	let pageDomain = ''
	getPageDomain().then(d => {pageDomain = d})

    let blockedDomains = []
    getDomainsBlocked().then(
        (domains) => {
            blockedDomains = Array.from(domains).sort()
        }
    )

	const selected = new Set() ;
	const toggleSelected = (domain) => {
		if (selected.has(domain)) {
			selected.delete(domain)
		} else {
			selected.add(domain)
		}
		selected = selected
	}

	const unblockSelected = () => {
		setDomainAllowed(pageDomain, Array.from(selected))
	}

</script>

<div class="list">
    {#each blockedDomains as domain}
		<div
			on:click={() => toggleSelected(domain)}
			class="{selected.has(domain) ? 'selected' : ''}"
		>
			{domain}
		</div>
    {/each}

	<button on:click={() => unblockSelected()}>Unblock Selected</button>
</div>

<style>
	.list {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		gap: 0.5em;

		font-size: 1.6em;
		color: black;
	}

	.selected {
		background-color: #ff3e00;
		color: white;
	}
</style>
