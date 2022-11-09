import { redirect } from '@sveltejs/kit';
import Database from 'better-sqlite3';
import { SECRET_DATABASE_PATH } from '$env/static/private'

// open one connection here, I don't close it. (you can do it differently)
const db = new Database(SECRET_DATABASE_PATH, {});

// when page is first loaded...
export function load({ params }) {
	const stmt = db.prepare(`SELECT rowid,word FROM words`);
	const rows = stmt.all();

	rows.forEach((row) => {
		console.log('db word -> ' + row.word);
	});

	// this will show up in the "data" var in the +page.svelte
	return { words: rows };
}

// If you're building an API (same behavior used multiple places, or wanting PUT/POST/DELETE)
// see https://kit.svelte.dev/docs/routing#server
// and do these things in +server.js.
// this is a design choice -- which is cleaner? :shrug:

// these are called when a form submits or you do a POST (at least)
export const actions = {
	// https://kit.svelte.dev/docs/form-actions
	insertWord: async ({ request }) => {
		const form = await request.formData();

		const word = form.get('word');

		// Shell, not browser console
		console.log({ word });

		const stmt = db.prepare(`INSERT INTO words VALUES (?)`);
		const info = stmt.run(word);

		console.log(
			'Inserted ',
			word,
			' rows changed:',
			info.changes,
			'rows, is was ',
			info.lastInsertRowid
		);

		// this is how we redirect to the newly created resource (doesn't work here for scripted-FORM:-)
		throw redirect(303, '/word/' + info.lastInsertRowid);
	},

	words: async ({ request }) => {
		const stmt = db.prepare(`SELECT rowid,word FROM words`);
		const rows = stmt.all();

		// this will show up in the "data" element of the response.json() in the +page.svelte
		return { words: rows };
	}
};
