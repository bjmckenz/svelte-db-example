<script>
	import WordTable from './WordTable.svelte';

	let newval;

	/** @type {import('./$types').PageData} */
	export let data;

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
	}

	// show that we loaded the data from the DB "at first page render"
	console.log('first ', { data });
</script>

<div class="title">Base My Data!</div>
<div class="note">Loads from DB when shown. Can add to DB. Click Refresh to reload from DB</div>

<div>
	<WordTable words={data.words} />
</div>
<form>
	<div>
		<input bind:value={newval} />
		<input class="btn" type="button" on:click={add} value="Add This Entry" />
	</div>

	<div>
		<input class="btn" type="button" on:click={refresh} value="Refresh Page" />
	</div>
</form>

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
