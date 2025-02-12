<script lang="ts">
	import Timeline from '$lib/Timeline.svelte';
	import type { TimelineItem } from '$lib/types';
	import { onMount } from 'svelte';

	let items: TimelineItem[] = [];
	let minsToPixels = 4;
	let textareaContent = '';

	onMount(() => {
		updateItemsFromTextarea();
	});

	function updateItemsFromTextarea() {
		if (!textareaContent.trim()) {
			console.warn('Textarea is empty, skipping JSON parsing.');
			items = [];
			return;
		}

		try {
			let parsedData = JSON.parse(textareaContent);

			// Prüfen, ob es sich um ein verschachteltes JSON-Objekt handelt oder ein direktes Array
			if (Array.isArray(parsedData)) {
				// Falls das JSON direkt ein Array ist, verwenden wir es
				items = parsedData;
			} else if (parsedData.timeline_items && Array.isArray(parsedData.timeline_items)) {
				// Falls das JSON-Objekt eine Eigenschaft "timeline_items" enthält
				items = parsedData.timeline_items;
			} else {
				console.error(
					'JSON format is invalid: Expected an array or an object with "timeline_items".',
					parsedData
				);
				items = [];
				return;
			}

			// Konvertiere die Strings in Date-Objekte
			items = items.map((item) => ({
				name: item.name,
				id: item.id,
				pickup_dropoff_minutes: item.pickup_dropoff_minutes,
				maximum_travel_duration_in_minutes: item.maximum_travel_duration_in_minutes,
				maximum_waiting_time_in_minutes: item.maximum_waiting_time_in_minutes,
				waypoint_index: item.waypoint_index,

				pickup_arrival_time: new Date(item.pickup_arrival_time),
				pickup_departure_time: new Date(item.pickup_departure_time),

				pickup_time_window_start: new Date(item.pickup_time_window_start),
				pickup_time_window_end: new Date(item.pickup_time_window_end),

				dropoff_time_window_start: new Date(item.dropoff_time_window_start),
				dropoff_time_window_end: new Date(item.dropoff_time_window_end),

				dropoff_arrival_time: new Date(item.dropoff_arrival_time),
				dropoff_departure_time: new Date(item.dropoff_departure_time)
			}));
		} catch (error) {
			console.error('Invalid JSON in textarea', error);
			items = [];
		}
	}
</script>

<div class="content">
	<div class="controls">
		<textarea
			bind:value={textareaContent}
			on:input={updateItemsFromTextarea}
			placeholder="Paste JSON result here"
		></textarea>
	</div>
	<Timeline {items} {minsToPixels} />
</div>

<style>
	:global(body) {
		margin: 0;
	}

	.content {
		display: flex;
		flex-direction: column;
		padding-top: 70px;
	}

	.controls {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 1rem;
		background: white;
		border-bottom: 1px solid #ccc;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.input-group {
		margin-bottom: 1rem;
	}

	textarea {
		width: 400px;
		resize: none;
	}
	:global(html) {
		font-size: 14px;
		font-family: 'Courier New', Courier, monospace;
	}
</style>
