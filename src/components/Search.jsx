import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import SearchIcon from '@material-ui/icons/Search';
import Footer from './Footer';


const Search = (props) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState();
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                    params: {
                        api_key: "VtTJZGlzGjhem288IZ932TOA6TGHlvDV",
                        limit: 48
                    }
                }, );
                console.log(results);
                setData(results.data.data);
            } catch (error) {
                setIsError(true);
                setTimeout(() => setIsError(false), 10000);
            }


            setIsLoading(false);
        }

        fetchData();
    }, []);

    const loadingGifs = () => {
        if (isLoading) {
            return <Loader />
        }
        return data.map(el => {
            return (
                <div key={el.id} className="gif">
                    <img src={el.images.original.url} alt="Gif" />
                </div>
            )
        })
    }
    const renderError = () => {
        if (isError) {
            return (
               ("Something went wrong. Please Reload the page") 
            );
        }
    }
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };
    const handleSubmit = async event => {
        setIsError(false);
        setIsLoading(true);
        event.preventDefault();
        try {
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: "VtTJZGlzGjhem288IZ932TOA6TGHlvDV",
                    q: search
                }
            });
            setData(results.data.data);
        } catch (error) {
            setIsError(true);
            setTimeout(() => setIsError(false), 4000);
        }
        setIsLoading(false);
    };

    return (
        <div className="main_div">
            <div className="nav_bar">
                <nav>
                    <input type="checkbox" id="check" />
                    <label htmlFor="check" className="checkbtn"><i className="fas fa-bars"></i> </label>
                    <ul>
                        <li>
                            <a href="/">
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                Explore
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                Company
                            </a>
                        </li>
                    </ul>
                </nav>
                <button className="login">Login</button>
            </div>
            <form>
                <input type="text" placeholder="search..." onChange={handleSearchChange} value={search} />
                <SearchIcon className="btn-src" onClick={handleSubmit} />
            </form>
            {renderError()}
            <div className="container gifs">
                {loadingGifs()}
            </div>
            <div className="footer_div">
            <Footer />
            </div>
        </div>
    )
};

export default Search;