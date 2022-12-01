import React, { useState } from 'react'
import { createApi } from 'unsplash-js';

const unsplash = createApi({ accessKey: 'gQxWM63Q9iNh0bYGf0kQEb_juW5vfOaqlgxTVBiVpnc' });

const Images = () => {

    const [photos, setPhotos] = useState([]);
    const [search, setSearch] = useState("");
    // const [description, setDescription] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);

    const fetchPhotos = async (e) => {
        e.preventDefault();

        unsplash.search.getPhotos({
            query: search
        }).then(data => { setPhotos(data.response.results) })

    }

    // useEffect(() => {
    //     fetchPhotos()
    // }, [])

    const changeHandler = (e) => {
        setSearch(e.target.value);
        // console.log(search);
    }

    const bookmarksHandler = (e) => {
        // console.log(e.target.parentNode);
        setBookmarks([...bookmarks, e.target.parentNode]);
        console.log(bookmarks);
    }

    return (
        <>
            <form onSubmit={fetchPhotos}>
                <input
                    type="text"
                    placeholder='Search free high resolution images'
                    onChange={changeHandler}
                    name="search"
                    value={search}
                />
                <button type='submit' className='submit'>Search</button>
            </form>

            <div className='image-container'>
                {
                    photos.map((image) => {
                        return (
                            <div className="imageDiv" key={image.id}>
                                <img
                                    className='mainImage'
                                    src={image.urls.small}
                                    // alt={(!image.alt_description) ? (image.alt_description) : (image.sponsorship.tagline)}
                                    alt="imageError"
                                />
                                <div className='add remove' onClick={bookmarksHandler}>ADD TO BOOKMARK</div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Images