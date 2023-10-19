import { AllApp } from 'App.styled';
import { fetchImages } from './api';
import { Btn } from "Button/Button";
import { ImageGallery } from "ImageGallery/ImageGallery";
import { Loader } from "Loader/Loader";
import { Searchbar } from "Searchbar/Searchbar";
import { Component } from "react";

export class App extends Component {
  state = {
    query: '',
    page: 1,
    galleryItems: [],
    loading: false,
    loadMore: false,
    error: false,
  }

  getImages = async () => {
    const { query, page } = this.state;

    try {
      this.setState({ loading: true, error: false });
      const pictures = await fetchImages(query, page);
      this.setState(prevState => ({
        galleryItems: [...prevState.galleryItems, ...pictures.hits]
      }));
      if (page < Math.ceil(pictures.totalHits / 12)) {
        this.setState({ loadMore: true })
      }
      if (page >= Math.ceil(pictures.totalHits / 12)) {
        this.setState({ loadMore: false })
      }

    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false })
    }
  }

  handleSubmit = (query) => {
    this.setState({
      query: query,
      page: 1,
      galleryItems: [],
    });
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  render() {
    const { galleryItems, loading, error, loadMore } = this.state;
    console.log(loadMore)
    console.log()
    return <AllApp>
      <Searchbar toSubmit={this.handleSubmit} />
      {error && <div>Wooops. Error! Need reload.</div>}
      {galleryItems.length > 0 && <ImageGallery images={galleryItems} />}
      {loadMore && <Btn onClick={this.handleLoadMore} />}
      {loading && <Loader />}
    </AllApp>;
  }
}
