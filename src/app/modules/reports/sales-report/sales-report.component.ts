import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html'
})
export class SalesReportComponent implements OnInit {
  summary: any = {};
  dateRange = '7'; // days
  constructor(private reports: ReportsService) {}

  async ngOnInit() {
    await this.load();
  }

  async load() {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - (Number(this.dateRange)||7));
    const res = await this.reports.getSalesSummary({ from: from.toISOString(), to: to.toISOString() });
    this.summary = res;
  }
}
