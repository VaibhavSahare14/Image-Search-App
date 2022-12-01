import React, { useState } from 'react'
import { createApi } from 'unsplash-js';

const unsplash = createApi({ accessKey: 'gQxWM63Q9iNh0bYGf0kQEb_juW5vfOaqlgxTVBiVpnc' });

const Images = () => {

    const [photos, setPhotos] = useState([]);
    const [search, setSearch] = useState("");
    const [bookmarks, setBookmarks] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    const fetchPhotos = async (e) => {
        e.preventDefault();
        unsplash.search.getPhotos({
            query: search
        }).then(data => { setPhotos(data.response.results) })
    }

    const changeHandler = (e) => {
        setSearch(e.target.value);
    }

    const handleBookmark = () => {
        setIsClicked(!isClicked);
    }

    const bookmarksHandler = (e) => {
        setBookmarks([...bookmarks, e.target.parentNode.firstChild.src]);
    }

    return (
        <>
            <div className='top'>
                <h1>React Photo Search</h1>
                <button className='bookmarks' onClick={handleBookmark}>Bookmarks</button>
            </div>

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

                {isClicked ?
                    (
                        <>
                            <p className='bookHeading'>BOOKMARKS ⇓ ⇒</p>
                            {bookmarks.map((image, i) => {
                                return (
                                    <div className="imageDiv" key={i}>
                                        <img
                                            className='mainImage'
                                            src={image}
                                            alt="imageError"
                                        />
                                    </div>
                                )
                            })}
                        </>
                    )
                    :
                    (
                        photos.map((image) => {
                            return (
                                <div className="imageDiv" key={image.id}>
                                    <img
                                        className='mainImage'
                                        src={image.urls.small}
                                        alt="imageError"
                                    />
                                    <div className='add remove' onClick={bookmarksHandler}>ADD TO BOOKMARK</div>
                                </div>
                            )
                        })
                    )}

            </div>
        </>
    )
}

export default Images