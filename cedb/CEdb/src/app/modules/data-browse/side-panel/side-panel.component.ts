import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
// import { CancerApiService } from 'src/app/shared/cancer-api.service';
import cancer_type from 'src/app/shared/constants/cancer_type';


@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})

export class SidePanelComponent implements OnInit  {
  @Output() $selectcancer = new EventEmitter<any>();
  @Output() $selecttissue = new EventEmitter<any>();


  constructor() {
  }

  cancers:string[] = cancer_type;
  sources:string[] = ["Primary tissue","Cell line"];

  ngOnInit(): void {
  }
  public cancersSelection(selections : any): void {
    let selected:string[] = []
    for (let entry of selections) {
      selected.push(entry.value)
    }
    this.$selectcancer.emit(selected)
  }
  public sourceSelection(selections : any): void {
    let selected:string[] = []
    for (let entry of selections) {
      selected.push(entry.value)
    }
    this.$selecttissue.emit(selected)
  }
}
