<script lang="ts">
	import Timeline from '$lib/Timeline.svelte';
	import type { TimelineItem } from '$lib/types';
	import { onMount } from 'svelte';

	let items: TimelineItem[] = [];
	let minsToPixels = 4;
	let textareaContent = JSON.stringify([
		{
			name: 'Item 1',
			pu_w_start: '2021-01-01T08:00:00',
			pu_w_end: '2021-01-01T10:00:00',
			pu_start: '2021-01-01T09:00:00',
			pu_end: '2021-01-01T09:30:00',
			do_w_start: '2021-01-01T11:00:00',
			do_w_end: '2021-01-01T12:00:00',
			do_start: '2021-01-01T11:30:00',
			do_end: '2021-01-01T11:45:00'
		},
		{
			name: 'Item 2',
			pu_w_start: '2021-01-02T08:30:00',
			pu_w_end: '2021-01-02T10:30:00',
			pu_start: '2021-01-02T09:30:00',
			pu_end: '2021-01-02T09:50:00',
			do_w_start: '2021-01-02T11:20:00',
			do_w_end: '2021-01-02T12:20:00',
			do_start: '2021-01-02T11:50:00',
			do_end: '2021-01-02T11:55:00'
		}
	]);

	onMount(() => {
		// Initialize items from textarea content if needed
		updateItemsFromTextarea();
	});

	function updateItemsFromTextarea() {
		console.log('🚀 ~ updateItemsFromTextarea ~ updateItemsFromTextarea:');
		try {
			const parsedItems = JSON.parse(textareaContent);
			if (Array.isArray(parsedItems)) {
				items = parsedItems.map((item) => ({
					...item,
					pu_w_start: new Date(item.pu_w_start),
					pu_w_end: new Date(item.pu_w_end),
					pu_start: new Date(item.pu_start),
					pu_end: new Date(item.pu_end),
					do_w_start: new Date(item.do_w_start),
					do_w_end: new Date(item.do_w_end),
					do_start: new Date(item.do_start),
					do_end: new Date(item.do_end)
				}));
			}
		} catch {
			console.error('Invalid JSON in textarea');
		}
	}
</script>

<div class="content">
	<div class="controls">
		<div class="input-group">
			<input type="number" bind:value={minsToPixels} />
			<label for="minsToPixels">Minutes to Pixels</label>
		</div>
		<textarea
			bind:value={textareaContent}
			on:input={() => updateItemsFromTextarea()}
			placeholder="Enter JSON data here"
		>
		</textarea>
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
		padding-top: 120px; /* Platz für .controls */
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
		width: calc(100% - 50px);
		height: 60px;
		padding: 0.5rem;
		resize: vertical;
	}
</style>
