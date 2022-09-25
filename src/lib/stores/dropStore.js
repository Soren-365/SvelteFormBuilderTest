import { writable } from 'svelte/store'
import TextInput from '$lib/components/formBlocks/textInput.svelte';
// import data_text from '$lib/components/formBlocks/textInput.svelte'

import EmailInput from '$lib/components/formBlocks/emailInput.svelte';
// import data_email from '$lib/components/formBlocks/emailInput.svelte'


let data_email = {
    label: '',
    required: true,
    hide: false
};

 let data_text = {
    label: '',
    hide: false,
    required: true,
    count: 0
};


export let objects = [
    {  el: "",id: 1, field_name: "", type: 'text', name: "", component: TextInput, data: data_text },
    {  el: "",id: 2, field_name: "", type: 'email', name: "", component: EmailInput, data: data_email }
];

export const dropStore = writable([])