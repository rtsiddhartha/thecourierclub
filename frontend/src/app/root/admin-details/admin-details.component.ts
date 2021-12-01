import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { GlobalDataManager } from 'src/app/global-data-manager.service';
import { Claim } from 'src/app/models/claim';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {


  public claims : Claim[];
  public displayMode = "Edit";
  public trackingId = '';

  constructor(
    private router: Router,
    private rest: RestApiService,
    public globalService: GlobalDataManager) { }

  ngOnInit(): void {
      this.getALLClaims();
  }

  public getALLClaims() {
    this.rest.getClaims()
      .then((products : Claim[] ) => {
        this.claims = products;
      });
  }

  public viewProductDetails(claimId) {
    this.router.navigate(['claim-details/' + claimId]);
  }


}
