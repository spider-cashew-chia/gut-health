export interface FruitOrVeg {
  id: number;
  name: string;
}

// The EatenItem is structurally identical to FruitOrVeg now.
export type EatenItem = FruitOrVeg;
