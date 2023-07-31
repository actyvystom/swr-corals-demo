import { useState } from "react";
import useSWR from "swr";

export default function Joke() {
  const [id, setId] = useState(0);
  const [jokesInfo, setJokesInfo] = useState([]);
  const { data, isLoading, error } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`
  );

  function handleToggleFunny(id) {
    setJokesInfo((jokesInfo) => {
      const info = jokesInfo.find((info) => info.id === id);
      if (info) {
        return jokesInfo.map((info) =>
          info.id === id ? { ...info, isFunny: !info.isFunny } : info
        );
      }
      return [...jokesInfo, { id, isFunny: true, copyright: "" }];
    });
  }

  const info = jokesInfo.find(
    (info) =>
      info.id === id ?? {
        isFunny: false,
      }
  );
  const { isFunny } = jokesInfo;
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
      <h1>
        {data.joke}
        <span
          role="img"
          aria-label={info.isFunny ? "A laughing face" : "An unamused face"}
        >
          {info.isFunny ? "🤣" : "😒"}
        </span>
      </h1>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
        <button type="button" onClick={() => handleToggleFunny(id)}>
          {isFunny ? "Stop laughing" : "start laughing"}
        </button>
      </div>
    </>
  );
}
