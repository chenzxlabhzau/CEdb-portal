import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { DownloadApiService } from './download-api.service';
import { downloadRecord } from 'src/app/shared/model/download-record';

export class downloadDataSource implements DataSource<downloadRecord> {
  private downloadRecordSubject = new BehaviorSubject<downloadRecord[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public resultLength: number | undefined;

  constructor(private downloadApiService: DownloadApiService) {}

  loaddownloadRecords(query:string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);

    this.downloadApiService
      .findDownloadRecords(query, pageIndex, pageSize)
      .pipe(
        tap((val) => {
          this.resultLength = val.count;
        }),
        map((res) => res.result),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((rnas) => this.downloadRecordSubject.next(rnas));
  }

  connect(collectionViewer: CollectionViewer): Observable<downloadRecord[]> {
    return this.downloadRecordSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.downloadRecordSubject.complete();
    this.loadingSubject.complete();
  }
}
