export interface InventoryItem {
  id?: number;
  name: string;
  category: string;
  stock: number;
  min: number;
  unit: string;
  costPrice: number;
  salePrice: number;
  supplier: string;
  isLowStock: boolean;
}

export interface Stat {
  label: string;
  value: number | string;
  icon: string;
  color: string;
}
