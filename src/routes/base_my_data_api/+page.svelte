<script>
	import { onMount } from 'svelte';
	import { goto } from "$app/navigation";
	import WordTable from '$lib/WordTable.svelte';

	let newval;


	// this is set by our page endpoint (+page.server.js) from the URL
	export let data;

	// initial mount needs to be told to load data. Otherwise no data load!
	// this is because the other styles have a page endpoint (page.server.js)
	// that is automagically hit, and it loads the data. Since the API style
	// doesn't need the page.server, we must trigger the load ourselves here.
	onMount(async () => {
		refresh();
	});

	async function refresh() {

		// open Chrome debugger to see this message
		console.log('clicked refresh!');

		const response1 = await fetch('/api/words', {
			method: 'GET'
		});

		const response_json = await response1.json();
		console.log({response_json});
		// updating of "data" here will trigger a UI update/repaint with the new item
		data.words = response_json.words;	
	}

	// this is the "scripted form-fetch" approach. Instead of using a real <form>
	// in the HTML, we manually fetch it ourselves. Note, POST. Note, pass params
	// with FormData.
	// Note also that the redirect at the end of the action in page.server.js does NOT
	// work here for some reason.
	// Good news is that we could then do it ourselves or reload the page or data.
	async function add() {
		// open Chrome debugger to see this message
		console.log("clicked add!. would add '" + newval + "'");
		console.log({ data });

		const formdata = new FormData();
		formdata.append('word', newval);
		newval = '';

		// this matches an routine in /api/word/server.js
		const response = await fetch('/api/word', {
			method: 'POST',
			body: formdata
		});

 		const r1_json = await response.json();
		console.log({r1_json});

		// reload page data
		await refresh();
	}

	// show that we loaded the data from the DB "at first page render"
	console.log('first ', { data });
</script>

<a href="/"><div class="title">Base My Data!</div></a>
<div class="note">Loads from DB when shown. Can add to DB. Click Refresh to reload from DB</div>

<div class="note">API at /api/word & /api/words</div>
<div>
	<WordTable words={data.words} />
</div>
<div>
	<input name="word" bind:value={newval} />
	<input class="btn" type="button" on:click={add} value="Add This Entry" />
</div>

<div>
	<input class="btn" type="button" on:click={refresh} value="Refresh Page" />
</div>

