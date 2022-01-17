import { FunctionComponent } from "react";

import "./ProductImage.component.scss"

interface ProductImageProps {
  imageraw?: string;
  imageName?: string;
}

const ProductImage: FunctionComponent<ProductImageProps> = (props) => {

  return (
    <img className="ProductImage" src={`data:image/jpeg;base64,${props.imageraw}`} alt={props.imageName ?? "Product image"}/>
  );
};

export default ProductImage;
