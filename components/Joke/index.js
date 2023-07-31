import { useState } from "react";
import useSWR from "swr";

export default function Joke() {
  const [id, setId] = useState(0);
  const { data, isLoading, error } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`
  );
  function handlePrevJoke() {
    setId(data.prevId);
  }

  function handleNextJoke() {
    setId(data.nextId);
  }
  if (isLoading) {
    return <h1>Loading data...</h1>;
  }

  if (error) {
    return <h1>An error occurred: {error.status}</h1>;
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>{data.joke}</h1>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
      </div>
    </>
  );
}
