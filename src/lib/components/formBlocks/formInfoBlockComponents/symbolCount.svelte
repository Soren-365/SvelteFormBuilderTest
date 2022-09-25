<script>
    import { dropStore } from "$lib/stores/dropStore";
	export /**
	 * @type {any}
	 */
	let instance_data;


    function handleChange() {
        console.log("instance_data", instance_data)
        console.log("dropStore", $dropStore)
    }
</script>

<div class="flex-auto component-container">
	<div class="w-24">
		<label class=" text-sm font-bold text-left label ">
			Zīmju skaits
			<div class="p-1 w-full border-solid border-2 border-gray-300 rounded-md">
				<input type="text" class="w-full text-right" bind:value={instance_data.count} on:input={handleChange}/>
			</div>
		</label>
	</div>
</div>
