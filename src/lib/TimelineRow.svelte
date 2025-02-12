<script lang="ts">
	import type { TimelineItem } from './types';

	export let minsToPixels = 2;
	export let item: TimelineItem;
</script>

<div class="item">
	<div class="sticky-column">{item.name}</div>
	<div class="timeline-container" style="width: {24 * 60 * minsToPixels}px;">
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
		margin-bottom: 10px;
		padding-top: 10px;
	}
	.sticky-column {
		position: sticky;
		left: 0;
		z-index: 15;
		background: transparent;
		padding: 5px;
		min-width: 150px; /* Damit genug Platz bleibt */
		max-width: 300px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}

	.timeline-container {
		position: relative;
		height: 90px;
		width: 100%;
		border-bottom: 1px solid #ccc;
		transition: all 0.1s ease;
	}

	.pickup_time_window_start,
	.pickup_arrival_time,
	.dropoff_time_window_start,
	.dropoff_arrival_time {
		position: absolute;
		/* border-radius: 5px; */
		transition: all 0.3s ease;
	}
	.timeline-container:hover {
		background-color: #00000008;
	}
	.timeline-container:hover .pickup_time_window_start,
	.timeline-container:hover .pickup_arrival_time,
	.timeline-container:hover .dropoff_time_window_start,
	.timeline-container:hover .dropoff_arrival_time {
		/* height: 20px; */
		/* margin: 0; */
	}
	.pickup_time_window_start:hover,
	.pickup_arrival_time:hover,
	.dropoff_time_window_start:hover,
	.dropoff_arrival_time:hover {
		z-index: 1000;
		/* height: 20px; */
		font-weight: bold;
	}

	.pickup_time_window_start {
		background-color: #e5edf7;
		height: 15px;
		border: none;
		border-radius: 2px;
		border-left: 2px solid #0066ff;
		border-right: 2px solid #0066ff;
	}

	.dropoff_time_window_start {
		margin-top: 15px;
		background-color: #f3d28f;
		height: 15px;
		border: none;
		border-radius: 2px;
		border-left: 2px solid #dfa000;
		border-right: 2px solid #dfa000;
	}

	.pickup_arrival_time {
		background-color: #93c19d;
		border: 1px solid #28a745;
		margin-top: -10px;
		height: 70px;
	}
	.dropoff_arrival_time {
		background-color: #dc354580;
		border: 1px solid #dc3545;
		margin-top: -10px;
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
	}
	.dropoff_time_window_start .time-label-start,
	.dropoff_time_window_start .time-label-end {
		background-color: #fff4d7;
		color: #9c7000;
	}
	.dropoff_arrival_time .time-label-start {
		background-color: #ffe9eb;
		color: #b91f2e;
	}
</style>
