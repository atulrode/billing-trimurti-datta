import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  stats: any[] = [];
  lowStock: any[] = [];
  sales: any[] = [];
 usedMB = '0';
  quotaMB = '0';
  percent = '0';
  quickActions = [
    { label: 'New Sale', icon: 'fas fa-plus-circle', route: '/billing', class: 'btn-success' },
    { label: 'Add Stock', icon: 'fas fa-plus-square', route: '/inventory', class: 'btn-outline-primary' },
    { label: 'Add Customer', icon: 'fas fa-user-plus', route: '/customers', class: 'btn-outline-primary' },
    { label: 'View Reports', icon: 'fas fa-chart-line', route: '/reports', class: 'btn-outline-primary' },
  ];

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadStorageInfo();
  }
 async loadStorageInfo() {
    const { usedMB, quotaMB, percent } = await this.dashboardService.getStorageEstimate();
    this.usedMB = usedMB;
    this.quotaMB = quotaMB;
    this.percent = percent;
  }
   async clearDB() {
    if (confirm('Are you sure you want to delete all local DB data?')) {
      await this.dashboardService.clearDexieDB();
      alert('Database cleared');
      this.loadStorageInfo();
    }
  }
  async loadDashboardData() {
    this.stats = await this.dashboardService.getStats();
    this.lowStock = await this.dashboardService.getLowStockItems();
    this.sales = await this.dashboardService.getRecentSales();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
