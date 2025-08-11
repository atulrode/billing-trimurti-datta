import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { BillHistoryComponent } from './bill-history/bill-history.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BillingComponent,
    CreateBillComponent,
    BillHistoryComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    FormsModule
  ]
})
export class BillingModule { }
