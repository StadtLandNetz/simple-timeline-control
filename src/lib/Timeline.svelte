<script lang="ts">
	import TimelineRow from './TimelineRow.svelte';
	import type { TimelineItem } from './types';

	export let minsToPixels = 2;
	export let items: TimelineItem[] = [];

	let scrollContainer: HTMLDivElement;
	let rowHeaders: HTMLDivElement;

	function syncScroll() {
		if (rowHeaders && scrollContainer) {
			rowHeaders.scrollTop = scrollContainer.scrollTop;
		}
	}

	function handleWheel(event: WheelEvent) {
		if (event.ctrlKey) {
			event.preventDefault();
			minsToPixels = Math.max(0.1, minsToPixels + (event.deltaY > 0 ? -0.1 : 0.1));
		}
	}
</script>

<div class="timeline" on:wheel={handleWheel}>
	<div class="rowContainer">
		<div class="rowHeaders" bind:this={rowHeaders}>
			<div class="rowHeaderTop">HEADER</div>
			{#each items as item}
				<div class="rowHeaderItem">{item.name}</div>
			{/each}
		</div>
		<div class="scroll-container" bind:this={scrollContainer} on:scroll={syncScroll}>
			<div class="rowContents">
				<div class="time-labels">
					{#each Array.from({ length: 24 * 4 }) as _, index}
						<div
							class="time-label {index % 4 === 0 ? 'full-hour' : ''}"
							style="width: {15 * minsToPixels - 1}px;"
						>
							{Math.floor(index / 4)}:{(index % 4) * 15 === 0 ? '00' : (index % 4) * 15}
						</div>
					{/each}
				</div>

				{#each items as item}
					<TimelineRow {item} {minsToPixels} />
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.timeline {
		display: flex;
		flex-direction: column;
		position: relative;
		height: 100vh;
		overflow: hidden;
	}

	.rowContainer {
		display: flex;
		height: 100%;
		width: 100%;
	}

	.rowHeaders {
		min-width: 400px;
		display: flex;
		flex-direction: column;
		position: sticky;
		left: 0;
		background: white;
		z-index: 10;
		overflow-y: hidden; /* Verhindert doppeltes Scrollen */
	}
	.rowHeaderItem {
		min-height: 100px;
		border-bottom: 1px solid #ccc;
		padding-top: 20px;
		border-right: 1px solid #ccc;
	}
	.rowHeaderTop {
		min-height: 37px;
		border-bottom: 1px solid #ccc;
		margin-bottom: 0px;
		border-right: 1px solid #ccc;
		position: sticky;
		top: 0;
		background: white;
		z-index: 20;
	}
	.scroll-container {
		overflow-x: auto;
		overflow-y: auto;
		flex-grow: 1;
		white-space: nowrap;
		position: relative;
	}

	.rowContents {
		width: max-content;
	}

	.time-labels {
		display: flex;
		position: sticky;
		top: 0;
		background: white;
		z-index: 15;
	}

	.time-label {
		text-align: center;
		font-size: 12px;
		border-left: 1px solid #ccc;
		background-color: #fff;
		padding-top: 17px;
		white-space: nowrap;
		display: inline-block;
		height: 20px;
		border-bottom: 1px solid #ccc;
	}
	.time-label.full-hour {
		background-color: #f6f6f6;
		font-weight: bold;
	}
</style>
