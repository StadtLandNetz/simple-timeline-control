<script lang="ts">
	import type { Address } from '../../lib/types'

	let customerUrl = ''
	let token = ''
	let addressListContent = ''
	let resultAreaContent = ''

	async function forwardGeocode() {
		try {
			const adrdresses = JSON.parse(addressListContent) as Address[]
			const addressesToGeocode = adrdresses
				.filter((address) => !address?.latitude || !address?.longitude)
				.map((address) => ({ ...address, houseNumber: address.housenumber }))
			resultAreaContent = JSON.stringify(
				await Promise.all(
					addressesToGeocode.map((address) => fetchFromApi('geocoding/forward', address))
				)
			)
		} catch (error) {
			console.error('Invalid JSON in textarea', error)
		}
	}

	async function reverseGeocode() {
		try {
			const adrdresses = JSON.parse(addressListContent) as Address[]
			const addressesToGeocode = adrdresses.filter((address) => !address?.city || !address?.zip)
			resultAreaContent = JSON.stringify(
				await Promise.all(
					addressesToGeocode.map((address) => fetchFromApi('geocoding/reverse', address))
				)
			)
		} catch (error) {
			console.error('Invalid JSON in textarea', error)
		}
	}

	async function fetchFromApi(endpoint: string, address: Partial<Address>) {
		try {
			const isForward = endpoint === 'geocoding/forward'
			const response = await fetch(`${customerUrl}/${endpoint}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					credentials: 'no-cors'
				},
				body: isForward
					? JSON.stringify(address)
					: JSON.stringify({
							latitude: address.latitude,
							longitude: address.longitude
						})
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data = await response.json()
			return { ...address, ...(isForward ? { ...data.coordinates } : { ...data }) }
		} catch (error) {
			console.error('Error fetching from API:', error)
			throw error
		}
	}
</script>

<h1>Geocoding</h1>
<div class="container">
	<label>
		<span>Customer URL (*)</span>
		<input type="text" name="customerUrl" bind:value={customerUrl} />
	</label>
	<label>
		<span>Token (*)</span>
		<input type="text" name="token" bind:value={token} />
	</label>
	<textarea bind:value={addressListContent} placeholder="Paste your addresses here"></textarea>
	<div class="buttons">
		<button
			disabled={!customerUrl || !addressListContent || !token}
			on:click={async () => await forwardGeocode()}>Forward geocode</button
		>

		<button
			disabled={!customerUrl || !addressListContent || !token}
			on:click={async () => await reverseGeocode()}>Reverse geocode</button
		>
	</div>
	<textarea bind:value={resultAreaContent} placeholder="The result will be here"></textarea>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;

		> label {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			> span {
				font-weight: bold;
			}

			> input {
				padding: 0.5rem;
				border: 1px solid #ccc;
				border-radius: 4px;
			}
		}

		> textarea {
			min-height: 200px;
		}
	}

	.buttons {
		display: flex;
		gap: 1rem;
	}
</style>
