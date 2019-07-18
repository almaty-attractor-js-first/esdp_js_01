import React from 'react';
import config from '../../config';
import defaultPicture from '../../assets/images/image_not_available.png';

const ProductThumbnail = props => {
    let photo = defaultPicture;

    if (props.photo) {
        photo = config.apiURL + '/uploads/' + props.photo;
    }

    return <img className="w-100" src={photo} alt=""/>
};

export default ProductThumbnail;
