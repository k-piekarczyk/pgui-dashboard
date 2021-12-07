import { FunctionComponent } from "react";

import "./Tile.component.scss";

interface TileProps {
  width: string;
  height: string;
}

const Tile: FunctionComponent<TileProps> = (props) => (
  <div className="Tile" style={{ width: props.width, height: props.height }}>
    {props.children}
  </div>
);

export default Tile;
