import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {superDataSource} from "./super-data-source";
import { merge} from 'rxjs';
import { SuperApiService } from "./super-api.service";
import { tap} from "rxjs/operators";


@Component({
  selector: 'app-super-result',
  templateUrl: './super-result.component.html',
  styleUrls: ['./super-result.component.css']
})
export class SuperResultComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() query:string;
  @Input() cancer:string;
  @Input() source:string;
  @Input() chr:string
  @Input() start:number
  @Input() end:number
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  dataSource: superDataSource | undefined;
  displayedColumns = ['sample_id', 'enhancer_id', 'loci', 'length',
    'detail_annotation','distance_to_TSS','nearest_gene_name',
  'GWAS_SNP_number','GTEx_eQTL_number','cancer_eQTL_number'];

  constructor(private DataApiService: SuperApiService) {
    this.dataSource = new superDataSource(this.DataApiService);
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
      this.dataSource.loadsuperRecords(
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
      this.dataSource.loadsuperRecords(
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
