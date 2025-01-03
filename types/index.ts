export type Cell = 0 | 1;
export type Row = Cell[];
export type World = Row[];
/** [Row to top, current Row, Row to bottom] */
export type Neighborhood = [Row | null, Row, Row | null];

/** Every cell has eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent */
export type Neighbors = {
  topLeft: Cell;
  top: Cell;
  topRight: Cell;
  right: Cell;
  bottomRight: Cell;
  bottom: Cell;
  bottomLeft: Cell;
  left: Cell;
};

export interface Payload {
  id: string;
  generationCount: number;
  size: number;
  world: World;
}

export interface Results {
  id: string;
  generationCount: number;
  generations: World[];
}
