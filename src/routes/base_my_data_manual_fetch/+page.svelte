<script>
	import WordTable from '$lib/WordTable.svelte';

	let newval;

	export let data;

	// this is A way to show the new data when you modify existing stuff
	// Probably better to either use the "form" property, or get the data with
	// a helper routine (see below in add() )
	function refresh() {
		// open Chrome debugger to see this message
		console.log('clicked refresh!');
		location.reload();
	}

	// this is the "scripted form-fetch" approach. Instead of using a real <form>
	// in the HTML, we manually fetch it ourselves. Note, POST. Note, pass params
	// with FormData.
	// We reload the page, including the new data.
	async function add() {
		// open Chrome debugger to see this message
		console.log("clicked add!. would add '" + newval + "'");
		console.log({ data });

		const formdata = new FormData();
		formdata.append('word', newval);

		// this matches an action in +page.server.js
		const response = await fetch('?/insertWord', {
			method: 'POST',
			body: formdata
		});

		// Just display our list after fetching it from the DB via an endpoint (action "words").
		const response1 = await fetch('?/words', {
			method: 'POST',
			body: new FormData()
		});

		const response_json = await response1.json();

		// updating of "data" here will trigger a UI update/repaint with the new item (data)
		data = response_json.data;
	}

	// show that we loaded the data from the DB "at first page render"
	console.log('first ', { data });
</script>

<a href="/"><div class="title">Base My Data!</div></a>
<div class="note">scripted fetch/POST to page.server, no real form present</div>
<div class="note">Loads from DB when shown. Can add to DB. Click Refresh to reload from DB</div>

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
