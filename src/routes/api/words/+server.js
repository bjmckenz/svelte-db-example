import Database from 'better-sqlite3';

// open one connection here, I don't close it. (you can do it differently)
const db = new Database('src/lib/database.db', {});

export function GET({ url }) {
	const stmt = db.prepare(`SELECT word,rowid FROM words`);
	const rows = stmt.all();

  return new Response(JSON.stringify({words: rows}));
}
