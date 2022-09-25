<script>
        import LabelTagName from './formBlockComponents/labelTagName.svelte';
	    import Label from './formInfoBlockComponents/label.svelte'; 	
	import Required from './formInfoBlockComponents/required.svelte';
	import HideLabel from './formInfoBlockComponents/hideLabel.svelte';
	import SymbolCount from './formInfoBlockComponents/symbolCount.svelte';
    import { dropStore } from '$lib/stores/dropStore'

	let labelName = 'Lauka nosaukums';
	let edit = false;

 

    export /**
	 * @type {number}
	 */
     let id

    let instance = $dropStore.find( component_data => component_data.field_name === id)

</script>

<div class="parent-component-container">
	<button on:click={() => (edit = !edit)}>
		<LabelTagName {instance}  type={"email"}/>
	</button>
    {#if edit}
	<div class="options-container">
		
        <div class="flex flex-1 flex-row flex-wrap items-center gap-x-4 gap-y-0">
            <div><Label instance_data={instance.data} /></div>
            <div class=""><HideLabel instance_data={instance.data} /></div>
            <div class=""><Required instance_data={instance.data}  /></div>
        </div>
		
	</div>
    {/if}
</div>
