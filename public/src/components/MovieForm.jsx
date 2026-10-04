export default function MovieForm() {
    return(
        <>
        <form>
  <div>
    <label htmlFor="title">Title</label>
    <input type="text" id="title" name="title" />
  </div>
  <div>
    <label htmlFor="synopsis">Synopsis</label>
    <textarea id="synopsis" name="synopsis" defaultValue={""} />
  </div>
  <div>
    <label htmlFor="genre">Genre</label>
    <select id="genre" name="genre">
      <option value="">Select Genre</option>
    </select>
  </div>
  <div>
    <label htmlFor="trailerUrl">Trailer URL</label>
    <input type="text" id="trailerUrl" name="trailerUrl" />
  </div>
  <div>
    <label htmlFor="imgUrl">Image URL</label>
    <input type="text" id="imgUrl" name="imgUrl" />
  </div>
  <div>
    <label htmlFor="rating">Rating</label>
    <input type="number" id="rating" name="rating" />
  </div>
  <button type="submit">Add Movie</button>
</form>
        </>
    )
}