import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  assets = environment.assets;
  constructor() {
   var aa={
  sample_id : "sample_00_001",
  data_sources : "roadmap",
  biosample_type : "tissue"
}

  }

  ngOnInit(): void {
  }

}
