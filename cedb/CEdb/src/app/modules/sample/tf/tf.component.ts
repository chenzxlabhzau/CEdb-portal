import {Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpParameterCodec } from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { tfDataSource } from "./tf-data-source";
import { SampleApiService } from "../sample-api.service";


@Component({
  selector: 'app-tf',
  templateUrl: './tf.component.html',
  styleUrls: ['./tf.component.css']
})
export class TFComponent implements OnInit, AfterViewInit {
  @Input() sample_id: string;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('input') input: ElementRef;
  displayedColumns = ["motif_name","pvalue","length_target","percent_target",
    "length_background","percent_background","motif"]
  constructor(private route: ActivatedRoute, private sampleApiService: SampleApiService) {
  }

  dataSource: tfDataSource | undefined;

  ngOnInit(): void {
    this.dataSource = new tfDataSource(this.sampleApiService);
    this.dataSource.loadtfRecords(this.sample_id, "", 'no', 'no', 0, 10);
  }

  ngAfterViewInit(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this._loadtfRecordsPage()))
      .subscribe();

    // @ts-ignore
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this._loadtfRecordsPage();
        })
      )
      .subscribe();

  }

  private _loadtfRecordsPage(): void {
    this.dataSource.loadtfRecords(
      this.sample_id,
      this.input.nativeElement.value,
      (this.sort == undefined) ? "no" : this.sort.active,
      (this.sort == undefined) ? "no" : this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
