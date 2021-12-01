import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalDataManager } from 'src/app/global-data-manager.service';
import { Claim } from 'src/app/models/claim';
import { RestApiService } from './../rest-api.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  public claims =  new Claim;

  name = '';
  cost = '';
  email = '';
  details = '';

  constructor(
    private router: Router,
    private rest: RestApiService,
    private globalService: GlobalDataManager
  ) {}

  ngOnInit(): void {
  }

  public submitClaim() {

    this.claims.productName = this.name;
    this.claims.cost = this.cost;
    this.claims.email = this.email;
    this.claims.comment = this.details;
    this.claims.status = 'pending';

    this.rest.createClaim(this.claims).then(
      response => {
        this.router.navigate(['']);
      }
    );
  }

}
