<script>
    import {
		getDomainsAllowed,
		getPageDomain,
		setDomainBlocked,
	} from '../data/dataConnections'

	let pageDomain = ''
	getPageDomain().then(d => {pageDomain = d})

    let allowedDomains = []
    getDomainsAllowed().then(
        (domains) => {
			console.error(domains)
            allowedDomains = Array.from(domains).sort()
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

	const blockSelected = () => {
		setDomainBlocked(pageDomain, Array.from(selected))
	}

</script>

<div class="list">
    {#each allowedDomains as domain}
		<div
			on:click={() => toggleSelected(domain)}
			class="{selected.has(domain) ? 'selected' : ''}"
		>
			{domain}
		</div>
    {/each}
	<button on:click={() => blockSelected()}>Block Selected</button>
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
