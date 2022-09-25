<script>

    import {dropStore, objects} from '$lib/stores/dropStore'

    import { onDestroy } from 'svelte';


    /**
	 * @type {any[]}
	 */
    let dropStore_;

  function handleClick() {
    dropStore_ = $dropStore
  }

	let name = 'world';

	// @ts-ignore
	let drop_zone;
	// let objects = [
	// 	{ el: null, id: 1, type: 'text', component: TextInput, data: "" },
	// 	{ el: null, id: 2, type: 'email', component: EmailInput, data:" " }
	// ];

	// @ts-ignore
	/**
	 * @type {any[]}
	 */
	let dropped = [];
    let dropObject
	let status = '';

	let dropped_in = false;
	let activeEvent = '';
	let originalX = '';
	let originalY = '';

	function handleDragEnter(e) {
		status = 'You are dragging over the ' + e.target.getAttribute('id');
	}

	function handleDragLeave(e) {
		status = 'You left the ' + e.target.getAttribute('id');
	}

    var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Date.now().toString();
};

	function handleDragDrop(e) {
		e.preventDefault();
        var element = e.dataTransfer
        console.log("element", element)
		var element_id = e.dataTransfer.getData('text');
		console.log('element id', element_id, typeof element_id);
         dropObject = objects.find((object) => object.id === parseInt(element_id))
        console.log("dropObject",dropObject)
        dropObject.field_name = dropObject?.type + '-' + ID()
        let copiedObject = JSON.parse(JSON.stringify(dropObject));
        console.log("dropObject2",dropObject)

        copiedObject.component = dropObject.component
                console.log("copiedObject",copiedObject)
		$dropStore = $dropStore.concat(copiedObject);
		dropped_in = true;
		status = 'You droped input type: "' + dropObject?.type + '" into drop zone';
	}

	function handleDragStart(e) {
		status = 'Dragging the element ' + e.target.getAttribute('id');
		e.dataTransfer.dropEffect = 'move';
		e.dataTransfer.setData('text', e.target.getAttribute('id'));
	}

	function handleDragEnd(e) {
		if (dropped_in == false) {
			status = 'You let the ' + e.target.getAttribute('id') + ' go.';
		}
		dropped_in = false;
	}

	function handleTouchStart(e) {
		status = 'Touch start with element ' + e.target.getAttribute('id');
		originalX = e.target.offsetLeft - 10 + 'px';
		originalY = e.target.offsetTop - 10 + 'px';
		activeEvent = 'start';
	}

	function handleTouchMove(e) {
		let touchLocation = e.targetTouches[0];
		let pageX = Math.floor(touchLocation.pageX - 50) + 'px';
		let pageY = Math.floor(touchLocation.pageY - 50) + 'px';
		status = 'Touch x ' + pageX + ' Touch y ' + pageY;
		e.target.style.position = 'absolute';
		e.target.style.left = pageX;
		e.target.style.top = pageY;
		activeEvent = 'move';
	}

	function handleTouchEnd(e) {
		e.preventDefault();
		if (activeEvent === 'move') {
			let pageX = parseInt(e.target.style.left) - 50;
			let pageY = parseInt(e.target.style.top) - 50;

			if (
				detectTouchEnd(
					drop_zone.offsetLeft,
					drop_zone.offsetTop,
					pageX,
					pageY,
					drop_zone.offsetWidth,
					drop_zone.offsetHeight
				)
			) {
				$dropStore = $dropStore.concat(e.target.id);
				e.target.style.position = 'initial';
				dropped_in = true;
				status = 'You dropped ' + e.target.getAttribute('id') + ' into drop zone';
			} else {
				e.target.style.left = originalX;
				e.target.style.top = originalY;
				status = 'You let the ' + e.target.getAttribute('id') + ' go.';
			}
		}
	}

	function detectTouchEnd(x1, y1, x2, y2, w, h) {
		//Very simple detection here
		if (x2 - x1 > w) return false;
		if (y2 - y1 > h) return false;
		return true;
	}
</script>

<h1 class="text-3xl font-bold">Form builder test</h1>
<h2 class="pt-8" id="app_status ">Drag status: {status}</h2>

<div class="p-10 flex gap-4">
    <div class="flex flex-col border-solid border-2 border-gray-300 rounded-md ">
        {#each objects.filter((v) => !$dropStore.includes(`${v.id}`)) as { id, component, type }, i}
        <div
            {id}
            class="objects "
            draggable="true"
            bind:this={objects[i].el}
            on:dragstart={handleDragStart}
            on:dragend={handleDragEnd}
            on:touchstart={handleTouchStart}
            on:touchmove={handleTouchMove}
            on:touchend={handleTouchEnd}
        >
            {type}
        </div>
    {/each}
    
    </div>
	<div
		on:dragenter={handleDragEnter}
		on:dragleave={handleDragLeave}
		on:drop={handleDragDrop}
		bind:this={drop_zone}
		id="drop_zone"
		ondragover="return false"
	>
		{#each $dropStore as object, i}
			<svelte:component this={object.component} id={object.field_name} />
		{/each}
	</div>

</div>
<button class="border-solid border-2 border-gray-500 p-2"on:click={handleClick}>
	Print Dropstore
</button>
{#if dropStore_}
     {#each dropStore_ as store}
     <div class="pt-2">
        <!-- {JSON.stringify(store)} -->
        <!-- const { [removeMe]: removedKey, ...newObj } = obj; -->
        {JSON.stringify((({ id, el, ...o }) => o)(store))}

     </div>
   {/each}
{/if}

<style>
	:global(html),
	:global(body) {
		margin: 0;
		height: 100%;
		overflow: hidden;
		user-select: none;
		-webkit-user-select: none;
	}

	#drop_zone {
		background-color: #eee;
		border: #999 1px solid;
		min-width: 200px;
		
		padding: 8px;
		font-size: 19px;
	}

	.objects {
		display: inline-block;
		background-color: #fff3cc;
		border: #dfbc6a 1px solid;
		
		margin: 10px;
		padding: 8px;
		font-size: 18px;
		text-align: center;
		box-shadow: 2px 2px 2px #999;
		cursor: move;
	}
</style>
