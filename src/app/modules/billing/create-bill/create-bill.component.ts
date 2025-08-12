import { Component, OnInit } from '@angular/core';
// import { BillingService } from '../billing.service';
// import { InventoryService } from 'src/app/services/inventory.service';
// import { CustomersService } from 'src/app/services/customers.service';
// import { BillItem, Bill } from 'src/app/services/app-db.service';
import { Router } from '@angular/router';
import { BillingService } from 'src/app/services/billing.services';
import { BillItem, Bill } from 'src/app/services/db.service';
import { InventoryService } from 'src/app/services/inventory-db.service';
import { CustomersService } from '../../customers/customers.service';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html'
})
export class CreateBillComponent implements OnInit {
  invoiceNo = '';
  date = new Date();
  customerList: any[] = [];
  itemsInCart: BillItem[] = [];
  searchTerm = '';
  selectedCustomerId: number | null = null;
  paymentType: 'cash'|'credit' = 'cash';
  paidAmount = 0;
itemsList: any[] = []
  constructor(
    private billingService: BillingService,
    private invService: InventoryService,
    private custService: CustomersService,
    private router: Router
  ){}

  async ngOnInit() {
    this.invoiceNo = await this.billingService.nextInvoiceNo();
    this.customerList = await this.custService.getAll(); // assume service method
    this.itemsList = await this.invService.getAllItems();
  }

  async searchInventory(term: string) {
    // assume InventoryService has search method; fallback to getAll and filter
    const items = await this.invService.getAllItems();
    return items.filter(i => i.name.toLowerCase().includes(term.toLowerCase()));
  }
// Called whenever customer changes
onCustomerChange() {
  // Always update bill date to current
  this.date = new Date();

  // Generate bill number if it's a new bill
  if (!this.invoiceNo) {
    this.invoiceNo = 'TH' + Math.floor(100000 + Math.random() * 900000);
  }
}

filteredItems: any[] = [];
// itemsList = [
//   { id: 1, name: 'Steel Pipes 1inch', price: 450, unit: 'Piece', stock: 45 },
//   { id: 2, name: 'Cement Bags 50kg', price: 380, unit: 'Bag', stock: 28 },
//   { id: 3, name: 'Electrical Wires 2.5mm', price: 25, unit: 'Meter', stock: 150 },
// ];

filterItems() {
 const term = this.searchTerm.toLowerCase();
  this.filteredItems = this.itemsList.filter(
    item => item.name.toLowerCase().includes(term)
  );
}
includeGst = false;
// addItemToBill(item: any) {
//   // Logic to push item into the cart
  
//   alert(JSON.stringify(item))
//   this.itemsInCart.push({ ...item, qty: 1 });
//   this.searchTerm = '';
//   this.filteredItems = [];
// }
addItemToBill(item: any) {
 console.log('Item to add:', item);
  const found = this.itemsInCart.find(i => i.sku === String(item.id));
  if (found) {
    found.qty++;
    this.updateItemAmount(found);
  } else {
    const newItem: BillItem = {
      sku: String(item.id),
      name: item.name,
      qty: 1,
      unit: item.unit || 'pcs',
      price: item.salePrice,  // or item.salePrice if that exists
      gstPercent: 18,
      amount: 0 // start with 0 and then update below
    };
    console.log('New item created:', newItem);
    this.updateItemAmount(newItem);
    this.itemsInCart.push(newItem);
  }
  this.searchTerm = '';
  this.filteredItems = [];
}

getSelectedCustomerName(): string {
  const selected = this.customerList?.find(c => c.id === this.selectedCustomerId);
  return selected ? selected.name : 'Walk-in';
}


// async handleSearchEnter() {
//   const results = await this.searchInventory(this.searchTerm);
//   if (results && results.length > 0) {
//     this.addInventoryItem(results[0]);
//   }
// }
async handleSearchEnter() {
  const results = await this.searchInventory(this.searchTerm);
  if (results && results.length > 0) {
    this.addInventoryItem(results[0]);
    this.searchTerm = '';
  }
}
updateItemAmount(item: BillItem) {
  item.price = Number(item.price) || 0;
  item.qty = Number(item.qty) || 0;
  item.amount = item.qty * item.price;
  console.log('Updated amount:', item.amount);
}

  // addInventoryItem(item: any) {
  //   const found = this.itemsInCart.find(i => i.sku === String(item.id));
  //   if (found) { found.qty++; found.amount = found.qty * found.price; }
  //   else {
  //     const it: BillItem = { sku: String(item.id), name: item.name, qty: 1, unit: item.unit || 'pcs', price: item.salePrice, gstPercent: 18, amount: item.salePrice };
  //     this.itemsInCart.push(it);
  //   }
  // }
addInventoryItem(item: any) {
  const found = this.itemsInCart.find(i => i.sku === String(item.id));
  if (found) { 
    found.qty++; 
    found.amount = found.qty * found.price; 
     console.log('Incremented:', found);
  } else {
    const it: BillItem = { 
      sku: String(item.id), 
      name: item.name, 
      qty: 1, 
      unit: item.unit || 'pcs', 
      price: item.price, 
      gstPercent: 18, 
      amount: item.salePrice || item.price || 0 
    };
     console.log('Adding new:', it);
    this.itemsInCart.push(it);
  }
  this.searchTerm = '';
  this.filteredItems = [];
}

  removeItem(index: number) { this.itemsInCart.splice(index, 1); }

  subtotal() { return this.itemsInCart.reduce((s, it) => s + it.qty * it.price, 0); }
  // gstTotal() { return this.itemsInCart.reduce((s, it) => s + (it.gstPercent || 0)/100 * it.qty * it.price, 0); }
  gstTotal() {
  if (!this.includeGst) return 0;
  return this.itemsInCart.reduce((sum, item) => {
    const gstPercent = item.gstPercent || 0;
    return sum + (gstPercent / 100) * item.qty * item.price;
  }, 0);
}

  total() { return +(this.subtotal() + this.gstTotal()).toFixed(2); }
async saveBill() {
  const bill: Bill = {
    invoiceNo: this.invoiceNo,
    date: new Date().toISOString(),
    customerId: this.selectedCustomerId,
    customerName: this.customerList.find(c => c.id === this.selectedCustomerId)?.name,
    items: this.itemsInCart,
    subtotal: this.subtotal(),
    gstTotal: this.gstTotal(),
    total: +(this.subtotal() + this.gstTotal()).toFixed(2),
    paymentType: this.paymentType,
    paidAmount: this.paidAmount,
    // optionally add gst inclusion flag if needed for record
    note: this.includeGst ? 'GST applied' : 'GST not applied',
  };
  // ...
}

  // async saveBill() {
  //   const bill: Bill = {
  //     invoiceNo: this.invoiceNo,
  //     date: new Date().toISOString(),
  //     customerId: this.selectedCustomerId,
  //     customerName: this.customerList.find(c => c.id === this.selectedCustomerId)?.name,
  //     items: this.itemsInCart,
  //     subtotal: this.subtotal(),
  //     gstTotal: this.gstTotal(),
  //     total: this.total(),
  //     paymentType: this.paymentType,
  //     paidAmount: this.paidAmount
  //   };
  //   const id = await this.billingService.saveBill(bill);
  //   // Optionally decrement stock via invService here
  //   // Reset
  //   this.itemsInCart = [];
  //   this.invoiceNo = await this.billingService.nextInvoiceNo();
  //   // navigate to history
  //   this.router.navigate(['/billing/history']);
  // }

  printInvoice() {
    const html = this.generateInvoiceHTML();
    const w = window.open('', '_blank')!;
    w.document.write(html);
    w.document.close();
    w.print();
  }

  generateInvoiceHTML() {
    // simple printable HTML template
    const customer = this.customerList.find(c => c.id === this.selectedCustomerId);
    const rows = this.itemsInCart.map(it => `<tr>
      <td>${it.name}</td><td>${it.qty}</td><td>₹${it.price}</td><td>₹${(it.qty*it.price).toFixed(2)}</td>
    </tr>`).join('');
    return `
      <html><head><title>Invoice ${this.invoiceNo}</title>
      <style>body{font-family:Arial;}table{width:100%;border-collapse:collapse;}td,th{padding:8px;border:1px solid #ddd}</style>
      </head><body>
      <h3>Trimurti Hardware</h3>
      <p>Invoice: ${this.invoiceNo} &nbsp; Date: ${new Date().toLocaleString()}</p>
      <p>Customer: ${customer?.name || '-'}</p>
      <table><thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table>
      <h4>Subtotal: ₹${this.subtotal().toFixed(2)}</h4>
      <h4>GST: ₹${this.gstTotal().toFixed(2)}</h4>
      <h3>Total: ₹${this.total().toFixed(2)}</h3>
      </body></html>`;
  }
}
