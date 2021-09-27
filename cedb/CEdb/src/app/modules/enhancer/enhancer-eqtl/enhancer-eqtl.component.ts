import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { merge } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { EnhancerApiService } from "../enhancer-api.service";
import { eqtlDataSource } from "./eqtl-data-source";


@Component({
  selector: 'app-enhancer-eqtl',
  templateUrl: './enhancer-eqtl.component.html',
  styleUrls: ['./enhancer-eqtl.component.css']
})
export class EnhancerEqtlComponent implements OnInit, AfterViewInit {
  @Input() eqtlType:string;
  @Input() enhancer_id:string;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  dataSource: eqtlDataSource | undefined;
  constructor(private route: ActivatedRoute, private enhancerApiService: EnhancerApiService ) { }

  displayedColumns = ['rsid','loci', 'gene','fdr', 'phenotype'];

  ngOnInit(): void {
    this.dataSource = new eqtlDataSource(this.enhancerApiService);
    this.dataSource.loadeqtlRecords(this.enhancer_id,this.eqtlType, 'no', 'no', 0, 10);
  }
   ngAfterViewInit(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this._loadeQTLRecordsPage()))
      .subscribe();
   }

  private _loadeQTLRecordsPage(): void {
    this.dataSource.loadeqtlRecords(
      this.enhancer_id,
      this.eqtlType,
      (this.sort == undefined)?"no":this.sort.active,
      (this.sort == undefined)?"no":this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
