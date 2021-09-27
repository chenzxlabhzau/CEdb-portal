import {Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { superDataSource } from "./super-data-source";
import { SampleApiService } from "../sample-api.service";
import { merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';


@Component({
  selector: 'app-super-enhancer',
  templateUrl: './super-enhancer.component.html',
  styleUrls: ['./super-enhancer.component.css']
})
export class SuperEnhancerComponent implements OnInit, AfterViewInit {
  @Input() sample_id:string;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('input') input: ElementRef;
  constructor(private route: ActivatedRoute, private sampleApiService:SampleApiService ) { }
  dataSource: superDataSource | undefined;

    displayedColumns = ['enhancer_id', 'loci', 'length',
    'detail_annotation','distance_to_TSS','nearest_gene_name',
  'GWAS_SNP_number','GTEx_eQTL_number','cancer_eQTL_number'];
  ngOnInit(): void {
    this.dataSource = new superDataSource(this.sampleApiService);
    this.dataSource.loadsuperRecords(this.sample_id,"", 'no', 'no', 0, 10);

  }
   ngAfterViewInit(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this._loadSuperRecordsPage()))
      .subscribe();

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this._loadSuperRecordsPage();

        })
      )
      .subscribe();

   }
     private _loadSuperRecordsPage(): void {
    this.dataSource.loadsuperRecords(
      this.sample_id,
      this.input.nativeElement.value,
      (this.sort == undefined)?"no":this.sort.active,
      (this.sort == undefined)?"no":this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

}
