import { AllApp } from 'App.styled';
import { fetchImages } from './api';
import { Btn } from "Button/Button";
import { ImageGallery } from "ImageGallery/ImageGallery";
import { Loader } from "Loader/Loader";
import { Searchbar } from "Searchbar/Searchbar";
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const [error, setError] = useState(false)

  const getImages = async () => {
    try {
      setLoading(true);
      setError(false);
      const pictures = await fetchImages(query, page);
      setGalleryItems(prevGalleryItems => [...prevGalleryItems, ...pictures.hits]);
      if (page < Math.ceil(pictures.totalHits / 12)) {
        setLoadMore(true);
      }
      if (page >= Math.ceil(pictures.totalHits / 12)) {
        setLoadMore(false);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (query && page) {
      getImages();
    }
  }, [query, page]);


  const handleSubmit = (query) => {
    setQuery(query)
    setPage(1)
    setGalleryItems([])
  }

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };


  return <AllApp>
    <Searchbar toSubmit={handleSubmit} />
    {error && <div>Wooops. Error! Need reload.</div>}
    {galleryItems.length > 0 && <ImageGallery images={galleryItems} />}
    {loadMore && <Btn onClick={handleLoadMore} />}
    {loading && <Loader />}
  </AllApp>;
}

