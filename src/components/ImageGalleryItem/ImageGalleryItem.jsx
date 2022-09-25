import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    tags: PropTypes.string,
    pic: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { id, pic, tags, preview } = this.props;
    const { showModal } = this.state;
    return (
      <>
        <li className="imagegalleryitem " id={id}>
          <img
            className="imagegalleryitem-image"
            onClick={this.toggleModal}
            src={pic}
            alt={tags}
          />
        </li>
        {showModal && (
          <Modal onClose={this.toggleModal} preview={preview} tags={tags} />
        )}
      </>
    );
  }
}
