
<script>
import WordTable from './WordTable.svelte';

export let newval = '';

let wordlist = [{ word:'alpha'},{word:'banana'}];

function refresh() {
	// open Chrome debugger to see this
  console.log("clicked refresh!");
	location.reload();
}

function add() {
	// open Chrome debugger to see this
  console.log("clicked add!. would add '"+newval+"'");
}

</script>

<div class=title>Base My Data!</div>
<div class=note>Loads from DB when shown. Can add to DB. Click Refresh to reload from DB</div>

<div>
	<WordTable words={wordlist} />
</div>

<div>
	<input bind:value={newval}/>
			<input
				class="btn"
				type="button"
				on:click={add}
				value="Add This Entry"
			/>
		</div>


<div>
			<input
				class="btn"
				type="button"
				on:click={refresh}
				value="Refresh Page"
			/>
		</div>

<style>
  .title	{
		text-align: center;
    font-size: 2vw;
		font-family: Arial;
}
.note	{
		text-align: center;
    font-size: 1vw;
		font-family: Arial;
}

</style>
