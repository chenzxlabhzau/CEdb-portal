import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {typicalDataSource} from "./typical-data-source";
import { merge} from 'rxjs';
import { typicalApiService } from "./typical-api.service";
import { tap} from "rxjs/operators";


@Component({
  selector: 'app-typical-result',
  templateUrl: './typical-result.component.html',
  styleUrls: ['./typical-result.component.css']
})
export class TypicalResultComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() query:string;
  @Input() cancer:string;
  @Input() source:string;
  @Input() chr:string
  @Input() start:number
  @Input() end:number
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  dataSource: typicalDataSource | undefined;
  displayedColumns = ['enhancer_name', 'sample_id', 'chr', 'start', 'end',
    'length','score','signalValue','cancer_abbr'];

  constructor(private DataApiService: typicalApiService) {
    this.dataSource = new typicalDataSource(this.DataApiService);
  }


  ngOnInit(): void {

  }

    ngOnChanges(changes: SimpleChanges): void {
      if (!(Object.values(changes)[0].firstChange )){
        this.paginator.pageIndex = 0
      }
      this._loadsampleRecordsPage(0,10)
    }

    ngAfterViewInit():void {
    this.paginator.page.pipe(tap(() => this._loadsampleRecordsPage(this.paginator.pageIndex,this.paginator.pageSize)));
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
     merge(this.sort.sortChange, this.paginator.page)
        .pipe(tap(() => this._loadsampleRecordsPage(this.paginator.pageIndex,this.paginator.pageSize)))
        .subscribe();
    }

    private _loadsampleRecordsPage(pageIndex,pageSize): void {

    if (this.sort==undefined){
      this.dataSource.loadtypicalRecords(
      this.source,
      this.cancer,
      this.query,
      this.chr,
      this.start,
      this.end,
      "no",
      "no",
      pageIndex,
      pageSize
    );
    }else {
      this.dataSource.loadtypicalRecords(
      this.source,
      this.cancer,
      this.query,
      this.chr,
      this.start,
      this.end,
      this.sort.active,
      this.sort.direction,
      pageIndex,
      pageSize
    );
    }
  }


}
