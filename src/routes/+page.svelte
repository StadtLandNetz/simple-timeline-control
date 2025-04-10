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
		<div class="legend">
			<hr class="pickup-time-window"/> pickup time window 
			<hr class="actual-pickup-time"/> actual pickup time
			<hr class="dropoff-time-window"/> dropoff time window
			<hr class="actual-dropoff-time"/> actual dropoff time
		</div>
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
	}

	.controls {
		width: 100%;
		padding: 1rem;
		background: white;
		border-bottom: 1px solid #ccc;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	textarea {
		width: 400px;
		resize: none;
	}
	:global(html) {
		font-size: 14px;
		font-family: 'Courier New', Courier, monospace;
	}

	.legend {
		display: grid;
		gap: 2px;
		align-items: center;
		grid-template-columns: 0.25fr 1fr;
		width: 400px;

		hr {
			width: 30px;
			height: 8px;
			border: none;
		}
	}

	.pickup-time-window {
		background-color: #daeafa;
	}

	.actual-pickup-time {
		background-color: #076d1f;
	}

	.dropoff-time-window {
		background-color: #fff4d7;
	}

	.actual-dropoff-time {
		background-color: #b91f2e;
	}
</style>
