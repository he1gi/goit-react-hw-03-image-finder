import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = '29341335-b9d8b4c451f4a87d12ab142f3';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    inputValue: '',
    imgs: [],
    page: 1,
    isLoading: false,
  };
  componentDidUpdate(_, prevState) {
    const { page, inputValue } = this.state;

    if (prevState.inputValue !== inputValue || prevState.page !== page) {
      this.fetchImg();
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = value => {
    this.setState({ inputValue: value, imgs: [], page: 1 });
  };

  fetchImg = async () => {
    const { page, inputValue } = this.state;
    this.setState({ isLoading: true });
    try {
      const response = await axios.get(
        `?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState(state => ({
        imgs: [...state.imgs, ...response.data.hits],
        isLoading: false,
      }));

      if (response.data.hits.length === 0) {
        toast.error('Упс... по запросу ничего не найдено', {
          autoClose: 1000,
        });
      }
    } catch {
      toast.error('Упс... что-то пошло не так');
    }
  };

  render() {
    const { imgs, isLoading } = this.state;
    return (
      <>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imgs={imgs} />
        {imgs.length !== 0 && <Button onClick={this.loadMore} />}
        {isLoading && <Loader />}
      </>
    );
  }
}
