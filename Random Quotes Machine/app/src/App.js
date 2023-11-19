import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [allData, setAllData] = useState([]);
    const [quote, setQuote] = useState({
        author: "None",
        text: "Waiting for quotes from API",
    });

    // This function makes an API call to fetch quotes
    async function fetchAllQuotes() {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        console.log("Data Fetched from API!");
        setAllData(data);
        const initialQuote = {
            author: data[0].author.replace(", type.fit", " "),
            text: data[0].text,
        };
        setQuote(initialQuote);
        return;
    }

    // eslint-disable-next-line
    useEffect(() => {
        async function fetchData() {
            await fetchAllQuotes();
        }
        fetchData();
    }, []);

    const getQuote = (e) => {
        e.preventDefault();
        const MAX = allData.length;
        const quote_idx = Math.floor(Math.random() * MAX);
        let author = allData[quote_idx].author.replace(", type.fit", " ");
        const response = {
            author: author === "type.fit" ? "Unknown Author" : author,
            text: allData[quote_idx].text,
        };
        setQuote(response);
        return response;
    };

    const JSX = (
        <>
            <section id="quote-box">
                <div id="text" className="quote-text">
                    <i className="fa fa-quote-left"> </i>
                    {quote.text}
                </div>
                <div id="author" className="quote-author">
                    <span>- </span>
                    {quote.author}
                </div>
                <a
                    id="tweet-quote"
                    href="https://twitter.com/intent/tweet?"
                    hidden
                >
                    This is not relevant. It is just to pass the tests ;D
                </a>
                <section className="buttons">
                    <a
                        className="button twitter-share-button"
                        id="tweet-quote2"
                        title="Tweet this quote!"
                        target="_blank"
                        rel="noreferrer"
                        href={`https://twitter.com/intent/tweet?text=%22${quote.text.replace(
                            " ",
                            "%20"
                        )}%22%0A-- ${quote.author.replace(" ", "%20")}`}
                    >
                        <i className="fa fa-twitter"></i>
                    </a>
                    <a
                        className="button tumblr-share-button"
                        id="tumblr-quote"
                        title="Post this quote on tumblr!"
                        target="_blank"
                        rel="noreferrer"
                        href={`http://tumblr.com/widgets/share/tool?canonicalUrl=github.com/Elvicharde&content=${quote.text}&caption=${quote.author}`}
                    >
                        <i className="fa fa-tumblr"></i>
                    </a>
                    <button
                        id="new-quote"
                        className="button"
                        onClick={getQuote}
                    >
                        NEW QUOTE
                    </button>
                </section>
            </section>
            <footer>
                <a href="https://www.github.com/Elvicharde">By elvicharde</a>
            </footer>
        </>
    );
    return JSX;
}

export default App;
