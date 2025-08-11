import Dexie, { Table } from 'dexie';
import { Injectable } from '@angular/core';
import { InventoryItem } from '../modules/inventory/inventory.model';


@Injectable({
  providedIn: 'root'
})
export class InventoryService extends Dexie {
  inventory!: Table<InventoryItem, number>;

  constructor() {
    super('InventoryDatabase');
    this.version(1).stores({
      inventory: '++id, name, category, stock, min' // add other indexes as needed
    });
    this.inventory = this.table('inventory');
  }

  getAllItems(): Promise<InventoryItem[]> {
    return this.inventory.toArray();
  }

  async addItem(item: InventoryItem): Promise<number> {
    item.isLowStock = item.stock < item.min;
    return await this.inventory.add(item);
  }

  async deleteItem(id: number): Promise<void> {
    return await this.inventory.delete(id);
  }

  async updateItem(id: number, changes: Partial<InventoryItem>): Promise<number> {
    return await this.inventory.update(id, changes);
  }
}
