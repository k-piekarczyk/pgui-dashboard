import { FunctionComponent } from "react";

import "./Tile.component.scss";

interface TileProps {
  width: string;
  height: string;
  header?: string;
}

const Tile: FunctionComponent<TileProps> = (props) => (
  <div className="Tile" style={{ width: props.width, height: props.height }}>
    {props.header ? <div className="Tile__header">{props.header}</div> : undefined}
    {props.children}
  </div>
);

export default Tile;
