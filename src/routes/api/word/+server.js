import Database from 'better-sqlite3';
import { SECRET_DATABASE_PATH } from '$env/static/private'

// open one connection here, I don't close it. (you can do it differently)
const db = new Database(SECRET_DATABASE_PATH, {});

export async function POST({request}) {

  const form = await request.formData();

  const word = form.get('word');

  // Shell, not browser console
  console.log("about to insert",{ word });

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

  return new Response(JSON.stringify({ success: true, rowid: info.lastInsertRowid, word: word }));

}
