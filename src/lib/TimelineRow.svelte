<script lang="ts">
	import type { TimelineItem } from './types';

	export let minsToPixels = 2;
	export let item: TimelineItem;
</script>

<div class="item">
	<div class="title">
		{item.name}
	</div>
	<div
		class="pu_w_start"
		style="left: {minsToPixels *
			(item.pu_w_start.getHours() * 60 + item.pu_w_start.getMinutes())}px; width: {minsToPixels *
			(item.pu_w_end.getHours() * 60 +
				item.pu_w_end.getMinutes() -
				(item.pu_w_start.getHours() * 60 + item.pu_w_start.getMinutes()))}px;"
	>
		<span class="time-label-start"
			>{item.pu_w_start.getHours()}:{item.pu_w_start.getMinutes().toString().padStart(2, '0')}</span
		>
		<span class="time-label-end"
			>{item.pu_w_end.getHours()}:{item.pu_w_end.getMinutes().toString().padStart(2, '0')}</span
		>
	</div>
	<div
		class="pu_start"
		style="left: {minsToPixels *
			(item.pu_start.getHours() * 60 + item.pu_start.getMinutes())}px; width: {minsToPixels *
			(item.pu_end.getHours() * 60 +
				item.pu_end.getMinutes() -
				(item.pu_start.getHours() * 60 + item.pu_start.getMinutes()))}px;"
	>
		<span class="time-label-start"
			>{item.pu_start.getHours()}:{item.pu_start.getMinutes().toString().padStart(2, '0')}</span
		>
		<span class="time-label-end"
			>{item.pu_end.getHours()}:{item.pu_end.getMinutes().toString().padStart(2, '0')}</span
		>
	</div>
	<div
		class="do_w_start"
		style="left: {minsToPixels *
			(item.do_w_start.getHours() * 60 + item.do_w_start.getMinutes())}px; width: {minsToPixels *
			(item.do_w_end.getHours() * 60 +
				item.do_w_end.getMinutes() -
				(item.do_w_start.getHours() * 60 + item.do_w_start.getMinutes()))}px;"
	>
		<span class="time-label-start"
			>{item.do_w_start.getHours()}:{item.do_w_start.getMinutes().toString().padStart(2, '0')}</span
		>
		<span class="time-label-end"
			>{item.do_w_end.getHours()}:{item.do_w_end.getMinutes().toString().padStart(2, '0')}</span
		>
	</div>
	<div
		class="do_start"
		style="left: {minsToPixels *
			(item.do_start.getHours() * 60 + item.do_start.getMinutes())}px; width: {minsToPixels *
			(item.do_end.getHours() * 60 +
				item.do_end.getMinutes() -
				(item.do_start.getHours() * 60 + item.do_start.getMinutes()))}px;"
	>
		<span class="time-label-start"
			>{item.do_start.getHours()}:{item.do_start.getMinutes().toString().padStart(2, '0')}</span
		>
		<span class="time-label-end"
			>{item.do_end.getHours()}:{item.do_end.getMinutes().toString().padStart(2, '0')}</span
		>
	</div>
</div>

<style>
	.item {
		position: relative;
		margin-bottom: 40px;
	}

	.title {
		font-weight: bold;
		margin-bottom: 5px;
		position: fixed;
		left: 0;
	}

	.pu_w_start,
	.pu_start,
	.do_w_start,
	.do_start {
		position: absolute;
		height: 20px;
		background-color: #007bff4f;
		border: 1px solid #007bff;
		border-radius: 5px;
	}

	.pu_start {
		background-color: rgba(40, 167, 69, 0.5);
		border-color: #28a745;
	}

	.do_w_start {
		background-color: #ffc1074d;
		border-color: #ffc107;
	}

	.do_start {
		background-color: rgba(220, 53, 69, 0.5);
		border-color: #dc3545;
	}

	.time-label-start,
	.time-label-end {
		position: absolute;
		bottom: -20px;
		font-size: 10px;
		background: #fff;
		padding: 2px 4px;
		border-radius: 3px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.time-label-start {
		transform: translateX(-50%);
	}

	.time-label-end {
		right: 0;
		transform: translateX(50%);
	}
</style>
