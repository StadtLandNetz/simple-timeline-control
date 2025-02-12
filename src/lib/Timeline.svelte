<script lang="ts">
	import TimelineRow from './TimelineRow.svelte';
	import type { TimelineItem } from './types';

	export let minsToPixels = 2;
	export let items: TimelineItem[] = [];

	let scrollContainer: HTMLDivElement;
	let rowHeaders: HTMLDivElement;

	let isDragging = false;
	let startX = 0;
	let startY = 0;
	let scrollLeft = 0;
	let scrollTop = 0;

	function syncScrollContent() {
		if (rowHeaders && scrollContainer) {
			rowHeaders.scrollTop = scrollContainer.scrollTop;
		}
	}
	function syncScrollHeader() {
		if (rowHeaders && scrollContainer) {
			scrollContainer.scrollTop = rowHeaders.scrollTop;
		}
	}

	function handleWheel(event: WheelEvent) {
		if (event.ctrlKey || event.metaKey || event.shiftKey) {
			event.preventDefault();
			minsToPixels = Math.max(0.2, minsToPixels + (event.deltaY > 0 ? -0.2 : 0.2));
		}
	}

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		startX = event.pageX - scrollContainer.offsetLeft;
		startY = event.pageY - scrollContainer.offsetTop;
		scrollLeft = scrollContainer.scrollLeft;
		scrollTop = scrollContainer.scrollTop;
	}

	function handleMouseMove(event: MouseEvent) {
		if (!isDragging) return;
		event.preventDefault();
		const x = event.pageX - scrollContainer.offsetLeft;
		const y = event.pageY - scrollContainer.offsetTop;
		const walkX = (x - startX) * 2; // Scroll-Faktor
		const walkY = (y - startY) * 2; // Scroll-Faktor
		scrollContainer.scrollLeft = scrollLeft - walkX;
		scrollContainer.scrollTop = scrollTop - walkY;
	}

	function handleMouseUp() {
		isDragging = false;
	}
</script>

<div class="timeline" on:wheel={handleWheel}>
	<div class="rowContainer">
		<div class="rowHeaders" bind:this={rowHeaders} on:scroll={syncScrollHeader}>
			<div class="rowHeaderTop">
				<div class="controls">
					<label for="minsToPixels">Mins to Pixels:</label>
					<input type="number" id="minsToPixels" bind:value={minsToPixels} step="0.5" min="1" />
				</div>
			</div>
			{#each items as item}
				<div class="rowHeaderItem">{item.name}</div>
			{/each}
		</div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="scroll-container"
			bind:this={scrollContainer}
			on:scroll={syncScrollContent}
			on:mousedown={handleMouseDown}
			on:mousemove={handleMouseMove}
			on:mouseup={handleMouseUp}
			on:mouseleave={handleMouseUp}
		>
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

	.controls {
		margin-bottom: 10px;
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
		overflow-y: auto; /* Ermöglicht vertikales Scrollen */
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
		cursor: grab;
	}

	.scroll-container:active {
		cursor: grabbing;
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
		text-align: left;
		font-size: 12px;
		border-left: 1px solid #ccc;
		background-color: #fff;
		padding-top: 17px;
		white-space: nowrap;
		display: inline-block;
		height: 20px;
		border-bottom: 1px solid #ccc;
		padding-left: 4px;
		margin-right: -4px;
	}
	.time-label.full-hour {
		background-color: #f6f6f6;
		font-weight: bold;
	}
</style>
