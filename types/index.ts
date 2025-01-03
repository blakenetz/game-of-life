export type Cell = 0 | 1;
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
export type World = Cell[][];

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
