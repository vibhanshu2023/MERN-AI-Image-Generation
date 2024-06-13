import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedResults, setSearchedResults] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async() => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/post');
            setAllPosts(response.data.data.reverse());
        } catch (error) {
            console.error('Error fetching posts:', error);
            alert('Failed to fetch posts.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        const searchText = e.target.value.toLowerCase();
        setSearchText(searchText);

        const searchResult = allPosts.filter(
            (post) =>
            post.name.toLowerCase().includes(searchText) ||
            post.prompt.toLowerCase().includes(searchText)
        );
        setSearchedResults(searchResult);
    };

    return ( <
            div >
            <
            h1 > Community Showcase < /h1> <
            input type = "text"
            placeholder = "Search posts"
            value = { searchText }
            onChange = { handleSearchChange }
            /> {
            loading ? ( <
                p > Loading... < /p>
            ) : ( <
                div > {
                    searchText ? (
                        searchedResults.length > 0 ? (
                            searchedResults.map((post) => ( <
                                div key = { post._id } >
                                <
                                h2 > { post.name } < /h2> <
                                p > { post.prompt } < /p> <
                                img src = { post.photo }
                                alt = { post.prompt }
                                /> < /
                                div >
                            ))
                        ) : ( <
                            p > No search results found. < /p>
                        )
                    ) : (
                        allPosts.length > 0 ? (
                            allPosts.map((post) => ( <
                                div key = { post._id } >
                                <
                                h2 > { post.name } < /h2> <
                                p > { post.prompt } < /p> <
                                img src = { post.photo }
                                alt = { post.prompt }
                                /> < /
                                div >
                            ))
                        ) : ( <
                            p > No posts yet. < /p>
                        )
                    )
                } <
                /div>
            )
        } <
        /div>
);
};

export default Home;