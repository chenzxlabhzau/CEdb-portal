import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-enhancer',
  templateUrl: './enhancer.component.html',
  styleUrls: ['./enhancer.component.css']
})
export class EnhancerComponent implements OnInit {
  enhancer_id:string;
  eqtlTypes=[
    {"show":"Cancer eQTL","label":"eqtl_cancer"},
    {"show":"GWAS SNP","label":"eqtl_gwas"},
    {"show":"GTEX eQTL","label":"eqtl_gtex"}
  ]

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.enhancer_id = params.enhancer_id;
    });
  }
  ngOnInit(): void {
  }

}
