import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SalesReportComponent],
  imports: [CommonModule, FormsModule, ReportsRoutingModule]
})
export class ReportsModule {}
