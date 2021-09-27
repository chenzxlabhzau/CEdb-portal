import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { typicalApiService } from './typical-api.service';
import {typicalRecord} from "src/app/shared/model/typical-record";


export class typicalDataSource implements DataSource<typicalRecord> {
  private typicalRecordSubject = new BehaviorSubject<typicalRecord[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public resultLength: number | undefined;

  constructor(private dataApiService: typicalApiService) {}

  loadtypicalRecords(source_type: string, cancer_type:string,query:string,chr:string,start:number,end:number,sortcol:string,sortOrder:string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);

    this.dataApiService
      .typicalRecords(source_type, cancer_type,query,chr,start,end,sortcol,sortOrder, pageIndex, pageSize)
      .pipe(
        tap((val) => {
          this.resultLength = val.count;
        }),
        map((res) => res.result),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((rnas) => this.typicalRecordSubject.next(rnas));
  }

  connect(collectionViewer: CollectionViewer): Observable<typicalRecord[]> {
    return this.typicalRecordSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.typicalRecordSubject.complete();
    this.loadingSubject.complete();
  }
}
