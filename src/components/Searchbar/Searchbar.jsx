import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearchengin } from 'react-icons/fa';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    inputValue: '',
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ inputValue: value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { inputValue } = this.state;
    const { onSubmit } = this.props;

    if (inputValue.trim() === '') {
      return toast.error('Введите название');
    }
    onSubmit(inputValue);
    // this.setState({ inputValue: '', page: 1 });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <header className="searchbar">
        <form className="searchform" onSubmit={this.handleSubmit}>
          <button className="searchform-button" type="submit">
            <span className="button-label">
              <FaSearchengin className="svg" />
            </span>
          </button>

          <input
            className="searchform-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
