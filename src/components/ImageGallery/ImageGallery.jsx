import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';

export default function ImageGallery({ imgs }) {
  return (
    <ul className="imagegallery">
      {imgs.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          pic={webformatURL}
          tags={tags}
          preview={largeImageURL}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  imgs: PropTypes.array.isRequired,
};
