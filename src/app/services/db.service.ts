// src/app/services/app-db.service.ts
import Dexie, { Table } from 'dexie';
import { Injectable } from '@angular/core';

export interface BillItem {
  sku?: string;
  name: string;
  qty: number;
  unit?: string;
  price: number;
  gstPercent?: number;
  amount?: number;
}

export interface Bill {
  id?: number;
  invoiceNo: string;
  date: string; // ISO
  customerId?: number | null;
  customerName?: string;
  items: BillItem[];
  subtotal: number;
  gstTotal: number;
  total: number;
  paymentType: 'cash'|'credit';
  paidAmount?: number;
  note?: string;
  status?: 'paid'|'pending';
}

@Injectable({ providedIn: 'root' })
export class AppDB extends Dexie {
  bills!: Table<Bill, number>;
  // You may already have inventory/customers tables in your existing DB class
  constructor() {
    super('TrimurtiDB');
    this.version(1).stores({
      // add your other tables too (inventory, customers,...)
      bills: '++id, invoiceNo, date, customerId'
    });
    this.bills = this.table('bills');
  }
}

export const db = new AppDB();
