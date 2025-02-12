<script lang="ts">
	import type { TimelineItem } from './types';

	export let minsToPixels = 2;
	export let item: TimelineItem;
</script>

<div class="item">
	<div class="timeline-container" style="width: {24 * 60 * minsToPixels}px;">
		<div class="time-labels">
			{#each Array.from({ length: 24 * 4 }) as _, index}
				<div
					class="time-label {index % 4 === 0 ? 'full-hour' : ''}"
					style="width: {15 * minsToPixels - 1}px;"
				></div>
			{/each}
		</div>
		<div
			class="pickup_time_window_start"
			style="left: {minsToPixels *
				(item.pickup_time_window_start.getHours() * 60 +
					item.pickup_time_window_start.getMinutes())}px; width: {minsToPixels *
				(item.pickup_time_window_end.getHours() * 60 +
					item.pickup_time_window_end.getMinutes() -
					(item.pickup_time_window_start.getHours() * 60 +
						item.pickup_time_window_start.getMinutes()))}px;"
		>
			<span class="time-label-start">
				{item.pickup_time_window_start.getHours()}:{item.pickup_time_window_start
					.getMinutes()
					.toString()
					.padStart(2, '0')}
			</span>
			<span class="time-label-end">
				{item.pickup_time_window_end.getHours()}:{item.pickup_time_window_end
					.getMinutes()
					.toString()
					.padStart(2, '0')}
			</span>
		</div>
		<div
			class="dropoff_time_window_start"
			style="left: {minsToPixels *
				(item.dropoff_time_window_start.getHours() * 60 +
					item.dropoff_time_window_start.getMinutes())}px; width: {minsToPixels *
				(item.dropoff_time_window_end.getHours() * 60 +
					item.dropoff_time_window_end.getMinutes() -
					(item.dropoff_time_window_start.getHours() * 60 +
						item.dropoff_time_window_start.getMinutes()))}px;"
		>
			<span class="time-label-start">
				{item.dropoff_time_window_start.getHours()}:{item.dropoff_time_window_start
					.getMinutes()
					.toString()
					.padStart(2, '0')}
			</span>
			<span class="time-label-end">
				{item.dropoff_time_window_end.getHours()}:{item.dropoff_time_window_end
					.getMinutes()
					.toString()
					.padStart(2, '0')}
			</span>
		</div>
		<div
			class="pickup_arrival_time"
			style="left: {minsToPixels *
				(item.pickup_arrival_time.getHours() * 60 +
					item.pickup_arrival_time.getMinutes())}px; width: {minsToPixels *
				(item.pickup_departure_time.getHours() * 60 +
					item.pickup_departure_time.getMinutes() -
					(item.pickup_arrival_time.getHours() * 60 + item.pickup_arrival_time.getMinutes()))}px;"
		>
			<span class="time-label-start">
				{item.pickup_arrival_time.getHours()}:{item.pickup_arrival_time
					.getMinutes()
					.toString()
					.padStart(2, '0')}
				{item.pickup_departure_time.getHours()}:{item.pickup_departure_time
					.getMinutes()
					.toString()
					.padStart(2, '0')}
			</span>
		</div>
		<div
			class="dropoff_arrival_time"
			style="left: {minsToPixels *
				(item.dropoff_arrival_time.getHours() * 60 +
					item.dropoff_arrival_time.getMinutes())}px; width: {minsToPixels *
				(item.dropoff_departure_time.getHours() * 60 +
					item.dropoff_departure_time.getMinutes() -
					(item.dropoff_arrival_time.getHours() * 60 + item.dropoff_arrival_time.getMinutes()))}px;"
		>
			<span class="time-label-start">
				{item.dropoff_arrival_time.getHours()}:{item.dropoff_arrival_time
					.getMinutes()
					.toString()
					.padStart(2, '0')}
				{item.dropoff_departure_time.getHours()}:{item.dropoff_departure_time
					.getMinutes()
					.toString()
					.padStart(2, '0')}
			</span>
		</div>
	</div>
</div>

<style>
	.item {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.timeline-container {
		position: relative;
		height: 90px;
		width: 100%;
		border-bottom: 1px solid #ccc;
		transition: all 0.1s ease;
		padding-top: 20px;
		padding-bottom: 10px;
	}

	.time-labels {
		display: flex;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.time-label {
		text-align: center;
		font-size: 12px;
		border-left: 1px solid #e8e8e8;
		background-color: #fff;
		padding-top: 17px;
		white-space: nowrap;
		display: inline-block;
		border-bottom: 1px solid #ccc;
		margin-bottom: -1px;
	}

	.time-label.full-hour {
		background-color: #f6f6f6;
	}

	.pickup_time_window_start,
	.pickup_arrival_time,
	.dropoff_time_window_start,
	.dropoff_arrival_time {
		position: absolute;
		transition: all 0.3s ease;
	}
	.timeline-container:hover {
		background-color: #00000008;
	}
	.pickup_time_window_start:hover,
	.pickup_arrival_time:hover,
	.dropoff_time_window_start:hover,
	.dropoff_arrival_time:hover {
		z-index: 1000;
		font-weight: bold;
	}

	.pickup_time_window_start {
		margin-top: 0px;
		background-color: #e5edf7;
		height: 25px;
		border: none;
		border-radius: 2px;
		border-left: 2px solid #0066ff;
		border-right: 2px solid #0066ff;
	}

	.dropoff_time_window_start {
		margin-top: 15px;
		background-color: #f3d28f;
		height: 25px;
		border: none;
		border-radius: 2px;
		border-left: 2px solid #dfa000;
		border-right: 2px solid #dfa000;
	}

	.pickup_arrival_time {
		margin-top: -10px;
		background-color: #93c19d;
		border: 1px solid #28a745;
		height: 70px;
	}
	.dropoff_arrival_time {
		margin-top: -10px;
		background-color: #dc354580;
		border: 1px solid #dc3545;
		height: 70px;
	}
	.time-label-start,
	.time-label-end {
		position: absolute;
		bottom: -20px;
		font-size: 10px;
		background: #fff;
		padding: 2px 4px;
		border-radius: 3px;
		/* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); */
	}

	.time-label-start {
		transform: translateX(-50%);
	}

	.time-label-end {
		right: 0;
		transform: translateX(50%);
	}
	.pickup_time_window_start .time-label-start,
	.pickup_time_window_start .time-label-end {
		background-color: #daeafa;
		color: #01468f;
	}
	.pickup_arrival_time .time-label-start {
		background-color: #d0eed7;
		color: #076d1f;
		bottom: -18px;
	}
	.dropoff_time_window_start .time-label-start,
	.dropoff_time_window_start .time-label-end {
		background-color: #fff4d7;
		color: #9c7000;
	}
	.dropoff_arrival_time .time-label-start {
		background-color: #ffe9eb;
		color: #b91f2e;
		bottom: -35px;
	}
</style>
