import { Injectable } from '@angular/core';
import { db } from 'src/app/services/db.service';


@Injectable({ providedIn: 'root' })
export class ReportsService {
  constructor() {}

  async getSalesSummary(range: {from?: string, to?: string}) {
    // simple demo: return totals and transactions count
    const bills = await db.bills.toArray();
    // filter by range if provided (ISO date strings)
    const filtered = bills.filter(b => {
      if (range.from && new Date(b.date) < new Date(range.from)) return false;
      if (range.to && new Date(b.date) > new Date(range.to)) return false;
      return true;
    });

    const totalSales = filtered.reduce((s, b) => s + (b.total || 0), 0);
    const transactions = filtered.length;
    const cash = filtered.filter(b=>b.paymentType==='cash').reduce((s,b)=>s+(b.total||0),0);
    const credit = filtered.filter(b=>b.paymentType==='credit').reduce((s,b)=>s+(b.total||0),0);

    // basic top products
    const productMap = new Map<string, {qty:number, amount:number}>();
    filtered.forEach(b => {
      b.items.forEach(it => {
        const name = it.name;
        const entry = productMap.get(name) || {qty:0, amount:0};
        entry.qty += it.qty;
        entry.amount += it.qty * it.price;
        productMap.set(name, entry);
      })
    });
    const topProducts = Array.from(productMap.entries()).map(([name, v])=>({name, qty: v.qty, amount: v.amount})).sort((a,b)=>b.amount-a.amount).slice(0,5);

    return { totalSales, transactions, cash, credit, topProducts, filtered };
  }
}
