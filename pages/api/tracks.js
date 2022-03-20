import path from 'path'
import Database from 'better-sqlite3'
const db = new Database(path.join(process.cwd(), '/db/chinook.db'), {readonly: true});
const sql = `
select
	t.TrackId,
	t.Name,
	a.Title as Album,
	ar.Name as Artist,
	mt.Name as MediaType,
	g.Name as Genre,
	t.Composer,
	t.Milliseconds,
	t.Bytes,
	t.UnitPrice
from Track t
	inner join Album a on t.AlbumId = a.AlbumId
	inner join Artist ar on a.ArtistId = ar.ArtistId
	inner join MediaType mt on t.MediaTypeId = mt.MediaTypeId
	inner join Genre g on t.GenreId = g.GenreId`;

export default function handler(req, res) {
    const tracks = req.query.limit ? db.prepare(sql + ` limit ?`).all(req.query.limit) : db.prepare(sql).all();
    res.status(200).json(tracks);
  }