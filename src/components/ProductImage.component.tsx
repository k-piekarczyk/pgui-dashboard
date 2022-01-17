import { FunctionComponent } from "react";

import "./ProductImage.component.scss"

interface ProductImageProps {
  imageraw?: string;
}

const ProductImage: FunctionComponent<ProductImageProps> = (props) => {

  return (
    <img className="ProductImage" src={`data:image/jpeg;base64,${props.imageraw}`} />
  );
};

export default ProductImage;
