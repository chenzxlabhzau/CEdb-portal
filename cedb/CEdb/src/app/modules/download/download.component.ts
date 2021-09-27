import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { DownloadApiService } from './download-api.service';
import { downloadDataSource } from './download-data-source';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('input') input: ElementRef | undefined;
  dataSource: downloadDataSource | undefined;
  public static = "static";
  displayedColumns = ['sample_id','cancer_nor', "GEO_id",'GSM_id', 'Biosample_type' ,'super_enhancer_number',
    "super_enhancer","typical_enhancer","TF"];
  constructor(private downloadApiService:DownloadApiService) {
    this.dataSource = new downloadDataSource(this.downloadApiService);
  }

  ngOnInit(): void {
    this.dataSource.loaddownloadRecords("",0,10)
  }

    ngAfterViewInit():void {

    this.paginator.page.pipe(tap(() => this._loaddownloadRecordsPage()));
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
     merge(this.sort.sortChange, this.paginator.page)
        .pipe(tap(() => this._loaddownloadRecordsPage()))
        .subscribe();
     fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this._loaddownloadRecordsPage();
      })
      )
      .subscribe();
  }
  private _loaddownloadRecordsPage(): void {
    this.dataSource.loaddownloadRecords(
      this.input.nativeElement.value,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

}
