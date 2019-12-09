import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {

  @Input() kpiData;

  constructor() { }

  ngOnInit() {
  }

}
