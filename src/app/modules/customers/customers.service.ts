import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

export interface Customer {
  id?: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  udhari: number;
  totalPurchases: number;
  lastTransaction: string; // ISO date string
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends Dexie {
  customers!: Table<Customer, number>;

  constructor() {
    super('CustomersDatabase');
    this.version(1).stores({
      customers: '++id, name, phone, email, address, udhari, totalPurchases, lastTransaction, active'
    });
    this.customers = this.table('customers');
  }

  getAll(): Promise<Customer[]> {
    return this.customers.toArray();
  }

  async add(customer: Customer): Promise<number> {
    return await this.customers.add(customer);
  }

  async update(id: number, changes: Partial<Customer>): Promise<number> {
    return await this.customers.update(id, changes);
  }


async getAllCustomers(): Promise<Customer[]> {
  return await this.customers.toArray();
}

async addCustomer(customer: Customer): Promise<number> {
  return await this.customers.add(customer);
}

async updateCustomer(id: number, changes: Partial<Customer>): Promise<number> {
  return await this.customers.update(id, changes);
}

async deleteCustomer(id: number): Promise<void> {
  return await this.customers.delete(id);
}



}
