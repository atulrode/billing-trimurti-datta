import { Component, OnInit } from '@angular/core';
import { CustomersService, Customer } from './customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  searchText = '';
  filter = 'all';
  stats = [
    { label: 'Total Customers', value: '0', colorClass: 'text-primary' },
    { label: 'Total Udhari', value: '₹0', colorClass: 'text-danger' },
    { label: 'With Udhari', value: '0', colorClass: 'text-warning' },
    { label: 'Active Customers', value: '0', colorClass: 'text-success' },
  ];

  customers: Customer[] = [];
    selectedCustomer: Customer | null = null;
  newCustomer: Customer = {
    name: '',
    phone: '',
    email: '',
    address: '',
    udhari: 0,
    totalPurchases: 0,
    lastTransaction: new Date().toISOString(),
    active: true
  };

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  async loadCustomers() {
    this.customers = await this.customersService.getAll();
    this.updateStats();
  }
viewCustomer(customer: Customer) {
  this.selectedCustomer = customer;
}
 openEditModal(customer: Customer) {
  this.selectedCustomer = { ...customer };
}

  async saveEditCustomer(updatedData: Customer) {
    if (!updatedData.id) return;
    await this.customersService.updateCustomer(updatedData.id, updatedData);
    await this.loadCustomers();
  }

  // Delete
  async deleteCustomer(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this customer?')) {
      await this.customersService.deleteCustomer(id);
      await this.loadCustomers();
    }
  }
  filteredCustomers() {
    return this.customers.filter(c => {
      const matchesSearch = this.searchText
        ? c.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          c.phone.includes(this.searchText) ||
          c.email.toLowerCase().includes(this.searchText.toLowerCase())
        : true;

      const matchesFilter =
        this.filter === 'all' ||
        (this.filter === 'withUdhari' && c.udhari > 0) ||
        (this.filter === 'noUdhari' && c.udhari === 0);

      return matchesSearch && matchesFilter;
    });
  }

  setFilter(type: string) {
    this.filter = type;
  }

  async addCustomer() {
    await this.customersService.add(this.newCustomer);
    this.newCustomer = {
      name: '',
      phone: '',
      email: '',
      address: '',
      udhari: 0,
      totalPurchases: 0,
      lastTransaction: new Date().toISOString(),
      active: true
    };
    document.getElementById('closeAddCustomerModal')?.click();
    this.loadCustomers();
  }

  updateStats() {
    const total = this.customers.length;
    const withUdhari = this.customers.filter(c => c.udhari > 0).length;
    const totalUdhari = this.customers.reduce((sum, c) => sum + c.udhari, 0);
    const activeCount = this.customers.filter(c => c.active).length;

    this.stats[0].value = total.toString();
    this.stats[1].value = `₹${totalUdhari}`;
    this.stats[2].value = withUdhari.toString();
    this.stats[3].value = activeCount.toString();
  }
}
