type Generation = (0 | 1)[];

export interface World {
  id: string;
  generationCount: number;
  size: number;
  world: Generation[];
}

export interface Results {
  id: string;
  generationCount: number;
  generations: Generation[];
}
