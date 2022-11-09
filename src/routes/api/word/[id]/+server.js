import Database from 'better-sqlite3';
import { SECRET_DATABASE_PATH } from '$env/static/private'

// open one connection here, I don't close it. (you can do it differently)
const db = new Database(SECRET_DATABASE_PATH, {});

export function GET({params}) {

	console.log("/api/word/["+params.id+"] being fetched");

	const stmt = db.prepare(`SELECT word,rowid FROM words WHERE rowid=?`);

	// this "id" matches the [id] in the slug/ I.e it's from the path.
	let row = stmt.get(params.id);
	
	if ( row != undefined) {
		row.status = "success";
	} else {
		row = { status: "no such row" };
	}

	console.log("/api/word/["+params.id+"] result: ",{row});

  return new Response(JSON.stringify(row));
}
