<script>
	import WordTable from './WordTable.svelte';

	let newval;

	/** @type {import('./$types').PageData} */
	export let data;
	export let form;

	// this is A way to show the new data when you modify existing stuff
	// Probably better to either use the "form" property, or get the data with
	// a helper routine (see below in add() )
	function refresh() {
		// open Chrome debugger to see this message
		console.log('clicked refresh!');
		location.reload();
	}

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

		// a POST redirects to the new resource
		await response.json();

		/// ALTERNATIVE TO "post redirectst"

		// either use the "form" variable, passed back from page.server
		// OR make a call here and update the variable, say "data.words = ...."
		// which will trigger page redisplay/update.
	}

	// show that we loaded the data from the DB "at first page render"
	console.log('first ', { data });
</script>

<div class="title">Base My Data!</div>
<div class="note">Loads from DB when shown. Can add to DB. Click Refresh to reload from DB</div>

<div>
	<WordTable words={data.words} />
</div>

	<div>
		<input bind:value={newval} />
		<input class="btn" type="button" on:click={add} value="Add This Entry" />
	</div>

	<div>
		<input class="btn" type="button" on:click={refresh} value="Refresh Page" />
	</div>


<style>
	.title {
		text-align: center;
		font-size: 2vw;
		font-family: Arial;
	}
	.note {
		text-align: center;
		font-size: 1vw;
		font-family: Arial;
	}
</style>
