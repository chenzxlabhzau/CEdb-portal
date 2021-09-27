import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute} from "@angular/router";
import {SampleApiService} from "../sample-api.service";
import {typicalDataSource} from "./typical-data-source";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";


@Component({
  selector: 'app-typical-enhancer',
  templateUrl: './typical-enhancer.component.html',
  styleUrls: ['./typical-enhancer.component.css']
})
export class TypicalEnhancerComponent implements OnInit, AfterViewInit {
  @Input() sample_id:string;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('input') input: ElementRef;

  constructor(private route: ActivatedRoute, private sampleApiService:SampleApiService ) { }
  dataSource: typicalDataSource | undefined;
  displayedColumns = ['enhancer_name', 'loci', 'length', 'score','pValue'];

  ngOnInit(): void {
    this.dataSource = new typicalDataSource(this.sampleApiService);
    this.dataSource.loadtypicalRecords(this.sample_id,"", 'no', 'no', 0, 10);
  }
  ngAfterViewInit(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this._loadTypicalRecordsPage()))
      .subscribe();

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this._loadTypicalRecordsPage();
        })
      )
      .subscribe();
   }
   private _loadTypicalRecordsPage(): void {
    this.dataSource.loadtypicalRecords(
      this.sample_id,
      this.input.nativeElement.value,
      (this.sort == undefined)?"no":this.sort.active,
      (this.sort == undefined)?"no":this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }



}
