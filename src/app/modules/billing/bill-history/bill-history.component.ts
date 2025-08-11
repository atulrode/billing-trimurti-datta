import { Component, OnInit } from '@angular/core';
import { BillingService } from 'src/app/services/billing.services';
import { Bill } from 'src/app/services/db.service';
// import { BillingService } from '../billing.service';
// import { Bill } from 'src/app/services/app-db.service';

@Component({
  selector: 'app-bill-history',
  templateUrl: './bill-history.component.html'
})
export class BillHistoryComponent implements OnInit {
  bills: Bill[] = [];
  search = '';

  constructor(private billingService: BillingService) {}

  async ngOnInit() {
    this.bills = await this.billingService.getBills();
  }

  filtered() {
    if(!this.search) return this.bills;
    const s = this.search.toLowerCase();
    return this.bills.filter(b => (b.invoiceNo || '').toLowerCase().includes(s) || (b.customerName||'').toLowerCase().includes(s));
  }
}
