<script>

  export let words = [];

</script>


<table>
	<thead>
		<tr>
			<th colspan=2>The Words</th>
		</tr>
		<tr>
			<th>DB rowid</th><th>Word</th>
		</tr>
	</thead>
	<tbody>
		{#each words as aWord}
			<tr>
				<td>{aWord.rowid}</td><td class=word>{aWord.word}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
	}
	td, th { 
		padding: 5px;
	}
	th {
		background: #ddd;
	}
	table {
		background: #eee;
		width: 80%;
		text-align: center;
	}
</style>
