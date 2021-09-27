import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { DataApiService } from './data-api.service';
import { sampleDataSource } from './data-source';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {FormControl} from "@angular/forms";
import {MatSelect} from "@angular/material/select";


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() cancer_type: string[];
  @Input() tissue_type: string[];
  @Input() peak_type: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild("chrselect") chrselect: MatSelect | undefined;
  @ViewChild('input') input: ElementRef | undefined;
  @ViewChild('start') start: ElementRef | undefined;
  @ViewChild('end') end: ElementRef | undefined;
  chr:string;
  chrs: string[] = ["chr1","chr2","chr3","chr4","chr5","chr6","chr7",
    "chr8","chr9","chr10","chr11","chr12","chr13","chr14","chr15","chr16","chr17",
    "chr18","chr19","chr20","chr21","chr22","chrX","chrY"
  ];

  dataSource: sampleDataSource | undefined;
  displayedColumns = ['peak_id','chr', 'start', 'end' ,'strand',
    'sample_coverage', 'nearest_gene' ,"Biosample_type", 'datatype'];
  constructor(private DataApiService: DataApiService) {
    this.dataSource = new sampleDataSource(this.DataApiService);
  }

  ngOnInit(): void {
    // this.dataSource = new sampleDataSource(this.DataApiService);
    this.dataSource.loadsampleRecords([],"BC", [],"","","","","","", 0, 10);

  }
    ngOnChanges(changes: SimpleChanges): void {
      if (!(Object.values(changes)[0].firstChange )){
        console.log(this.cancer_type)
        this.paginator.pageIndex = 0
        this._loadsampleRecordsPage()
      }


    }

  ngAfterViewInit():void {
    console.log(this.cancer_type)
    this.paginator.page.pipe(tap(() => this._loadsampleRecordsPage()));
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
     merge(this.sort.sortChange, this.paginator.page)
        .pipe(tap(() => this._loadsampleRecordsPage()))
        .subscribe();
    const selectStart$ = fromEvent(this.start.nativeElement, 'keyup');
    const selectEnd$ = fromEvent(this.end.nativeElement, 'keyup');
    const querySymbol$ = fromEvent(this.input.nativeElement, 'keyup');
    merge(selectStart$, selectEnd$).pipe(
      debounceTime(150),
      filter((e: KeyboardEvent) => e.keyCode === 13),
        distinctUntilChanged(),
      tap(() => {
        console.log(this.start.nativeElement.value),
        this.paginator.pageIndex = 0;
        this._loadsampleRecordsPage();
        console.log("aaaa")
      })
      )
      .subscribe();
    console.log("init")
    this.chrselect.selectionChange
    .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      tap(() => {
        console.log(typeof this.start.nativeElement.value),
          console.log(this.chrselect.value)
        this.paginator.pageIndex = 0;
        this._loadsampleRecordsPage();
        // console.log(this.chrselect.value)
      })
      )
      .subscribe();
    querySymbol$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this._loadsampleRecordsPage();
        console.log("aaaa")
      })
      )
      .subscribe();
  }
private _loadsampleRecordsPage(): void {
    this.dataSource.loadsampleRecords(
      this.peak_type,
      this.cancer_type[0],
      this.tissue_type,
      this.chrselect.value,
      this.start.nativeElement.value,
      this.end.nativeElement.value,
      this.input.nativeElement.value,
      (this.sort == undefined)?"no":this.sort.active,
      (this.sort == undefined)?"no":this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
