<script lang="ts">
	import TimelineRow from './TimelineRow.svelte';
	import type { TimelineItem } from './types';

	export let minsToPixels = 2;
	export let items: TimelineItem[] = [];
</script>

<div class="timeline">
	<div class="header">
		{#each Array.from({ length: 24 * 4 }) as _, index}
			<div
				class="time-label {index % 4 === 0 ? 'bold' : ''}"
				style="left: {index * 15 * minsToPixels}px; width: {15 *
					minsToPixels}px; height: calc(40px * {items.length})"
			>
				{Math.floor(index / 4)}:{(index % 4) * 15 === 0 ? '00' : (index % 4) * 15}
			</div>
		{/each}
	</div>
	<div class="content">
		{#each items as item}
			<TimelineRow {item} {minsToPixels} />
		{/each}
	</div>
</div>

<style>
	.timeline {
		display: flex;
		flex-direction: column;
		padding-top: 50px;
		position: relative;
		height: 100vh; /* Damit Sticky funktioniert */
		overflow: hidden; /* Wichtig: verhindert ungewolltes Scrollen */
	}

	.content {
		width: 100%;
		position: relative;
		z-index: 10;
		overflow-y: auto; /* Scrollbar nur für den Inhalt */
		max-height: calc(100vh - 50px); /* Platz unter der Header-Leiste */
	}

	.header {
		position: sticky;
		top: 0;
		left: 0;
		height: 50px;
		width: 100%;
		background-color: white;
		z-index: 10;
		border-bottom: 1px solid #ccc;
	}

	.time-label {
		position: absolute;
		height: 100%;
		text-align: left;
		font-size: 12px;
		border-left: 1px solid #ccc;
		background-color: #fff;
		padding-top: 12px;
		padding-left: 0px;
	}

	.time-label.bold {
		font-weight: bold;
		background-color: #f8f8f8f8;
	}

	.time-label::before {
		content: ' ';
		background-color: #f0f0f0;
		border-bottom: 1px solid #ccc;
		top: 40px;
		position: absolute;
		width: 100%;
		left: 0;
	}

	.timeline-container {
		position: relative;
		height: calc(40px * var(--rows, 1));
	}
</style>
