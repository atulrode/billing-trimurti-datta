import { Injectable } from '@angular/core';
import { Bill, db } from './db.service';
// import { db, Bill } from 'src/app/services/app-db.service';

@Injectable({ providedIn: 'root' })
export class BillingService {
  constructor() {}

  async saveBill(bill: Bill): Promise<number> {
    bill.date = new Date().toISOString();
    bill.subtotal = bill.items.reduce((s, it) => s + (it.qty * it.price), 0);
    bill.gstTotal = bill.items.reduce((s, it) => s + ((it.gstPercent || 0) / 100 * it.qty * it.price), 0);
    bill.total = +(bill.subtotal + bill.gstTotal).toFixed(2);
    bill.status = bill.paymentType === 'cash' ? 'paid' : 'pending';
    const id = await db.bills.add(bill);
    return id;
  }

  async getBills(): Promise<Bill[]> {
    return db.bills.orderBy('date').reverse().toArray();
  }

  async getBillById(id: number): Promise<Bill | undefined> {
    return db.bills.get(id);
  }

  async nextInvoiceNo(): Promise<string> {
    const last = await db.bills.orderBy('id').last();
    const next = last ? last.id! + 1 : 1;
    return `TH${String(next).padStart(6, '0')}`;
  }
}
