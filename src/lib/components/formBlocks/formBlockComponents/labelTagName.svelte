<script>

export /**
	 * @type {any}
	 */
	let instance;

	export /**
	 * @type {any}
	 */let type
</script>

<div class="pt-1 pb-1 ">
	<div class=" text-sm font-bold text-left label">Lauka nosaukums - {type}</div>
	<div class=" border-solid border-2 border-gray-300 rounded-md ">
		<input class="w-full text-lg" type="text"  bind:value={instance.name}  />
	</div>
</div>
