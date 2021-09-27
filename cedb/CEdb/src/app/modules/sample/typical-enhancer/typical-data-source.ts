import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { SampleApiService } from '../sample-api.service';
import { enhancerRecord } from "src/app/shared/model/enhancer-record";


export class typicalDataSource implements DataSource<enhancerRecord> {
  private typicalRecordSubject = new BehaviorSubject<enhancerRecord[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public resultLength: number | undefined;

  constructor(private dataApiService: SampleApiService) {}

  loadtypicalRecords(sample_id: string, query:string, sortcol:string,sortOrder:string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);

    this.dataApiService
      .typicalRecords(sample_id,query,sortcol,sortOrder, pageIndex, pageSize)
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

  connect(collectionViewer: CollectionViewer): Observable<enhancerRecord[]> {
    return this.typicalRecordSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.typicalRecordSubject.complete();
    this.loadingSubject.complete();
  }
}
