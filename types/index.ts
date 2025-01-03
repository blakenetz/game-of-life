export type World = (0 | 1)[][];

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
