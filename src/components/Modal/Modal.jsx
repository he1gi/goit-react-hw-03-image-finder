import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    tags: PropTypes.string,
    preview: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyPress);
  }

  onKeyPress = event => {
    const { onClose } = this.props;
    if (event.code === 'Escape') {
      onClose();
    }
  };
  handleBackDropClick = event => {
    const { onClose } = this.props;
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  render() {
    const { preview, tags } = this.props;
    return createPortal(
      <div className="overlay" onClick={this.handleBackDropClick}>
        <div className="modal">
          <img src={preview} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
