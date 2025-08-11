import { Component, Input, OnInit } from '@angular/core';

import { InventoryItem, Stat } from './inventory.model';
import { InventoryService } from 'src/app/services/inventory-db.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  inventoryItems: InventoryItem[] = [];
  stats: Stat[] = [];
  @Input() editItem: InventoryItem = {} as InventoryItem;
  categories: string[] = [
    'Pipes & Fittings',
    'Cement & Construction',
    'Electrical',
    'Tools',
    'Hardware',
    'Paint & Chemicals',
  ];
  selectedCategory: string = 'All';
  searchText: string = '';

  newItem: any = {}; // You can define NewItem type if needed

  constructor(private inventoryService: InventoryService) {}

  async ngOnInit() {
    await this.loadInventory();
  }
  updateItem() {
    if (!this.selectedItem.id) return; // safeguard

    this.inventoryService
      .updateItem(this.selectedItem.id, {
        name: this.selectedItem.name,
        category: this.selectedItem.category,
        stock: this.selectedItem.stock,
        min: this.selectedItem.min,
        costPrice: this.selectedItem.costPrice,
        salePrice: this.selectedItem.salePrice,
        supplier: this.selectedItem.supplier,
        isLowStock: this.selectedItem.stock < this.selectedItem.min,
      })
      .then(() => {
        this.loadInventory();
        let closeModel: HTMLElement = document.getElementById(
          'closeEditModal'
        ) as HTMLElement;
        closeModel.click();
      });
  }

  async loadInventory() {
    this.inventoryItems = await this.inventoryService.getAllItems();
    this.updateStats();
  }
  selectedItem = {} as InventoryItem;

  setEditItem(item: InventoryItem) {
    this.selectedItem = { ...item };
  }

  updateStats() {
    const totalValue = this.inventoryItems.reduce(
      (sum, item) => sum + item.stock * item.costPrice,
      0
    );

    this.stats = [
      {
        label: 'Total Items',
        value: this.inventoryItems.length,
        icon: 'fas fa-box',
        color: 'primary',
      },
      {
        label: 'Low Stock',
        value: this.inventoryItems.filter((i) => i.stock < i.min).length,
        icon: 'fas fa-exclamation-triangle',
        color: 'warning',
      },
      {
        label: 'Total Value',
        value: `₹${totalValue.toFixed(2)}`,
        icon: 'fas fa-rupee-sign',
        color: 'success',
      },
      {
        label: 'Categories',
        value: new Set(this.inventoryItems.map((i) => i.category)).size,
        icon: 'fas fa-tags',
        color: 'info',
      },
    ];
  }

  async addItem() {
    await this.inventoryService.addItem({
      ...this.newItem,
      stock: this.newItem.quantity, // map quantity to stock
    });
    await this.loadInventory();
  }

  filteredItems(): InventoryItem[] {
    return this.inventoryItems.filter(
      (item) =>
        (this.selectedCategory === 'All' ||
          item.category === this.selectedCategory) &&
        (!this.searchText ||
          item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.supplier.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  filterCategory(cat: string) {
    this.selectedCategory = cat;
  }
}
