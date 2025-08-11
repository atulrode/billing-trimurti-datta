import { Injectable } from '@angular/core';
import { db } from 'src/app/services/db.service';
import { InventoryService } from 'src/app/services/inventory-db.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private inventoryService: InventoryService) {}

  async getStats() {
    const allItems = await this.inventoryService.getAllItems();

    const totalItems = allItems.length;
    const totalCustomers = 0; // You can hook this up later from a CustomersService
    const udhari = 45320; // Hardcoded for now
    const todaySales = 12850; // Replace with real sales data when available

    return [
      { label: 'Total Stock Items', value: totalItems.toLocaleString(), icon: 'fa-boxes' },
      { label: 'Total Customers', value: totalCustomers.toLocaleString(), icon: 'fa-users' },
      { label: 'Udhari Balance', value: `₹${udhari.toLocaleString()}`, icon: 'fa-wallet' },
      { label: 'Sales Today', value: `₹${todaySales.toLocaleString()}`, icon: 'fa-coins' }
    ];
  }

  async getLowStockItems() {
    const allItems = await this.inventoryService.getAllItems();
    return allItems
      .filter(item => item.stock < item.min)
      .map(item => ({
        name: item.name,
        supplier: item.supplier,
        current: item.stock,
        min: item.min
      }));
  }

  async getRecentSales() {
    // For now, mock data. Replace with Dexie sales table when available.
    return [
      { id: '#001234', type: 'Cash', name: 'Rajesh Kumar', amount: '₹2,450', time: '10:30 AM' },
      { id: '#001235', type: 'Credit', name: 'Priya Sharma', amount: '₹1,850', time: '11:15 AM' },
      { id: '#001236', type: 'Cash', name: 'Amit Singh', amount: '₹3,200', time: '12:00 PM' },
      { id: '#001237', type: 'Credit', name: 'Sunita Devi', amount: '₹950', time: '1:45 PM' }
    ];
  }
   async clearDexieDB() {

    await db.delete();
    return true;
  }
  async getStorageEstimate() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const { usage = 0, quota = 0 } = await navigator.storage.estimate();
      return {
        usedMB: (usage / 1024 / 1024).toFixed(2),
        quotaMB: (quota / 1024 / 1024).toFixed(2),
        percent: ((usage / quota) * 100).toFixed(2),
      };
    }
    return { usedMB: '0', quotaMB: '0', percent: '0' };
  }
}
