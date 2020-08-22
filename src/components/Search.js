import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("programming");
  const [results, setResults] = useState([]);

  // cannot pass async function directly
  useEffect(() => {
    // Workaround 1) en.wikipedia.org/w/api.php?acction=query&list=search&format=json&origin=*&srsearch=
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };

    if (term && !results.length) {
      search();
    } else {
      // setTime out will return timer id
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 500);

      // you can return a  function from useEffect for cleanup purpose
      return () => {
        clearTimeout(timeoutId);
      };
    }



    // Workaround 2)
    // (async () => {
    //   await axios.get('');
    // })();

    // Workaround 3) - use promises
    // axios.get('')
    //     .then((response) => {
    //       console.log(response.data);
    //     });
  }, [term]);

  const renderedResults = results.map((result) => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          {/* how to process html in text */}
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
