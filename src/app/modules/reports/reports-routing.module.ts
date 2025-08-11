import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesReportComponent } from './sales-report/sales-report.component';

const routes: Routes = [
  { path: '', redirectTo: 'sales', pathMatch: 'full' },
  { path: 'sales', component: SalesReportComponent }
  // add stock, udhari, profit routes similarly
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
