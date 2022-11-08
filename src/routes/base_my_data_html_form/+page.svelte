<script>
	import WordTable from '$lib/WordTable.svelte';

	let newval;

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

	// show that we loaded the data from the DB "at first page render"
	console.log('first ', { data });
</script>

<a href="/"><div class="title">Base My Data!</div></a>
<div class="note">Loads from DB when shown. Can add to DB. Click Refresh to reload from DB</div>
<div class="note">FORM element to page.server</div>

<div>
	<WordTable words={data.words} />
</div>

<div class="note">
	This approach uses no JS to submit. Just the form action. It uses the same page.server.js action
	as the scripted-form-fetch approach.
</div>
<form method="POST" action="/base_my_data_html_form?/insertWord">
	<div>
		<input name="word" />
		<input class="btn" type="submit" value="Add This Entry" />
	</div>
</form>

<div>
	<input class="btn" type="button" on:click={refresh} value="Refresh Page" />
</div>

