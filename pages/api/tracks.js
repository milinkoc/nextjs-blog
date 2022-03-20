import path from 'path'
import Database from 'better-sqlite3'
const db = new Database(path.join(process.cwd(), 'database/Chinook.db'), {});
const getTracksSql = `
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
    // Get data from your database
    let limit = req.query.limit;
    
    let sql = limit ? getTracksSql + ` limit ${limit}` : getTracksSql;
    const trackData = db.prepare(sql).all();
    //res.end( JSON.stringify(trackData));
    //res.json(limit == null ? trackData : trackData.slice(0, limit));
    res.status(200).json(trackData);
    //res.status(200).json(users)
  }