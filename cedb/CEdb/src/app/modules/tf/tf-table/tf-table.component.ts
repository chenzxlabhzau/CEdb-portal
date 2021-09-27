import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { TfDataSource } from "./tf-data-source";
import { merge } from 'rxjs';
import { TfApiService } from "./tf-api.service";
import { tap } from "rxjs/operators";


@Component({
  selector: 'app-tf-table',
  templateUrl: './tf-table.component.html',
  styleUrls: ['./tf-table.component.css']
})
export class TfTableComponent implements OnInit, OnChanges, AfterViewInit  {
  @Input() query:string;
  @Input() selected_cancer:string;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  dataSource: TfDataSource | undefined;
  displayedColumns = ['motif_name', 'cancer_abbr', 'cancer_tf_sum', 'primary_num',
    'cell_num','all_cancer_num','oddsr',
  'pvalue'];

  constructor(private DataApiService: TfApiService) {
    this.dataSource = new TfDataSource(this.DataApiService);
  }

  ngOnInit(): void {
    this.dataSource.loadtfstatRecords("undefined", "undefined","","", 0, 10);
  }

  ngOnChanges(changes: SimpleChanges): void {

      if (!(Object.values(changes)[0].firstChange )){
        this.paginator.pageIndex = 0
      }
      this._loadtfstatRecordsPage(0,10)
    }

  ngAfterViewInit():void {
    this.paginator.page.pipe(tap(() => this._loadtfstatRecordsPage(this.paginator.pageIndex,this.paginator.pageSize)));
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
     merge(this.sort.sortChange, this.paginator.page)
        .pipe(tap(() => this._loadtfstatRecordsPage(this.paginator.pageIndex,this.paginator.pageSize)))
        .subscribe();

    }
  private _loadtfstatRecordsPage(pageIndex,pageSize): void {
     this.dataSource.loadtfstatRecords(
      this.selected_cancer,
      this.query,
      this.sort.active,
      this.sort.direction,
      pageIndex,
      pageSize
    );
  }
}
