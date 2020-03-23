import * as React from "react";
import axios from "axios";
import {Fragment, useState, useEffect} from "react";
interface Ihits {
  objectID: string;
  url: string;
  title: string;
}

interface IinitialData<T> {
  hits: Array<T>
}


const useDataApi = (initialUrl:string, initialData: IinitialData<Ihits>) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  // return [{ data, isLoading, isError }, setUrl];
  return {data, isLoading, isError , setUrl};
};

function UseDataFetch() {
  const [query, setQuery] = useState('redux');
  const {data, isLoading, isError, setUrl} = useDataApi(
    'https://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] },
  );
  return (
    <Fragment>
      <form
        onSubmit={event => {
          setUrl(
            `http://hn.algolia.com/api/v1/search?query=${query}`,
          );
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}
export default UseDataFetch;


