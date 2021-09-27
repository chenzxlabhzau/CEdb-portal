import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { DataApiService } from './data-api.service';
import { sampleDataSource } from './data-source';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() cancer_type: string[];
  @Input() tissue_type: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('input') input: ElementRef | undefined;

  dataSource: sampleDataSource | undefined;
  displayedColumns = ['sample_id','cancer_nor', 'GSM_id', 'Biosample_type' ,'super_enhancer_number'];
  constructor(private DataApiService: DataApiService) {
    this.dataSource = new sampleDataSource(this.DataApiService);
  }

  ngOnInit(): void {
    // this.dataSource = new sampleDataSource(this.DataApiService);
    this.dataSource.loadsampleRecords([], [],"","", 0, 10);
  }
    ngOnChanges(changes: SimpleChanges): void {
      if (!(Object.values(changes)[0].firstChange )){
        this.paginator.pageIndex = 0
        this._loadsampleRecordsPage()
      }


    }

  ngAfterViewInit():void {
    this.paginator.page.pipe(tap(() => this._loadsampleRecordsPage()));
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
     merge(this.sort.sortChange, this.paginator.page)
        .pipe(tap(() => this._loadsampleRecordsPage()))
        .subscribe();
     fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this._loadsampleRecordsPage();
      })
      )
      .subscribe();
  }
private _loadsampleRecordsPage(): void {
    this.dataSource.loadsampleRecords(
      this.cancer_type,
      this.tissue_type,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
