<script>
	import { page } from '$app/stores';

// This is a "view a word" page. You could call it a detail page. 
// Word rowid is the key (/word/999).

	import { onMount } from 'svelte';

	// this is set by our page endpoint (+page.server.js) from the URL
	export let data;

	let word;
	let error;

	onMount(async () => {
		const response1 = await fetch('/api/word/' + data?.id, {
			method: 'GET'
		});

		const response_json = await response1.json();

		console.log({ response_json });
		
		// updating of these will trigger a UI update/repaint with the new item
		if (response_json.status == 'success') {
			word = response_json;
			error = undefined;
		} else {
			word = undefined;
			error = 'no such word';
		}
	});
</script>

<div class="title">Word as retrieved from the DB</div>

{#if error}<div class="error">{error}</div>{/if}

{#if word}<div class="data">Id: {word?.rowid}, Word: {word?.word}</div>{/if}

<style>
	.title, .data, .error {
		text-align: center;
		font-size: 3vw;
		font-family: Arial;
		margin-top: 20px;
	}
	.data,
	.error {
		font-weight: bold;
	}
	.error {
		background-color: red;
	}
</style>
