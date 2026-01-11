export interface Recipe {
    id: string;
    title: string;
    selected: boolean;
    ingredients: string[];
    steps: string[];
}