import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillHistoryComponent } from './modules/billing/bill-history/bill-history.component';
import { CreateBillComponent } from './modules/billing/create-bill/create-bill.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  // Placeholder for other lazy-loaded modules:
   { path: '', redirectTo: 'create', pathMatch: 'full' },
  { path: 'create', component: CreateBillComponent },
  { path: 'history', component: BillHistoryComponent },

  {
    path: 'inventory',
    loadChildren: () =>
      import('./modules/inventory/inventory.module').then(m => m.InventoryModule),
  },
  {
    path: 'billing',
    loadChildren: () =>
      import('./modules/billing/billing.module').then(m => m.BillingModule),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./modules/customers/customers.module').then(m => m.CustomersModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./modules/reports/reports.module').then(m => m.ReportsModule),
  },
  // Optional 404 route
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
