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
				style="left: {index * 15 * minsToPixels}px; width: {15 * minsToPixels}px;"
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
	.content {
		width: 100%;
		height: 100%;
	}
	.timeline {
		display: flex;
		flex-direction: column;
		padding-top: 50px;
	}

	.header {
		height: 50px;
	}

	.content {
		position: relative;
	}

	.time-label {
		position: absolute;
		/* top: 0; */
		padding-top: 20px;
		height: 100%;
		/* width: 30px; */
		text-align: center;
		font-size: 12px;
		border-left: 1px solid #ccc;
	}
	.time-label.bold {
		font-weight: bold;
		background-color: #f0f0f0;
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
</style>
