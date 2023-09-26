import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getSearchApi } from 'api/apiGallery';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import css from './Styles.module.css';
import { Modal } from './Modal/Modal';
export class App extends Component {
  state = {
    isLoading: false,
    images: [],
    searchValue: '',
    currentPage: 1,
    modalImage: '',
    buttonShow: false,
  };
  onInputFind = value => {
    this.setState({ searchValue: value });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.setState({ currentPage: 1, images: [] });
    }
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({
      isLoading: true,
    });

    try {
      const { hits, total } = await getSearchApi(
        this.state.searchValue,
        this.state.currentPage
      );

      this.setState(prev => ({ images: [...prev.images, ...hits] }));
      this.setState({
        buttonShow: true,
      });

      if (total < 12 || hits.length < 12) {
        this.setState({ buttonShow: false });
      }
    } catch (error) {
      alert(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  onLoadMoreClick = () => {
    this.setState(prev => ({
      currentPage: prev.currentPage + 1,
    }));
  };
  onImageClick = e => {
    if (e.target !== e.currentTarget) {
      this.setState({
        modalImage: e.target.alt,
        modalIsOpen: true,
      });
    }
  };
  onBackdropClose = e => {
    if (e.target === e.currentTarget) {
      this.setState({ modalIsOpen: false });
    }
  };
  onEscClose = e => {
    if (e.code !== 'Escape') {
      return;
    }
    this.setState({ modalIsOpen: false });
  };
  render() {
    return (
      <div className={css.App}>
        {this.state.modalIsOpen && (
          <Modal
            onBackdropClose={this.onBackdropClose}
            modalImage={this.state.modalImage}
            onEscClose={this.onEscClose}
          />
        )}
        <Searchbar onFind={this.onInputFind} />
        <ImageGallery
          images={this.state.images}
          onImageClick={this.onImageClick}
        />
        {this.state.isLoading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}
        {this.state.buttonShow && (
          <Button onLoadMoreClick={this.onLoadMoreClick} />
        )}
      </div>
    );
  }
}
