export interface Recipe {
  id: string;
  title: string;
  selected: boolean;
  ingredients: Ingredient[];
  steps: string[];
}

export interface Ingredient {
  name: string;
  quantity?: string;
  checked?: boolean;
}
