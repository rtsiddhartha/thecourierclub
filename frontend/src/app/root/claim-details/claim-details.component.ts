import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalDataManager } from 'src/app/global-data-manager.service';
import { Claim } from 'src/app/models/claim';
import { RestApiService } from 'src/app/rest-api.service';


@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.css']
})
export class ClaimDetailsComponent implements OnInit {

  id : string;
  claim : Claim;  

  constructor(private route: ActivatedRoute,
    private rest: RestApiService,
    private router: Router,
    public globalService: GlobalDataManager) {  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getClaim(this.id);
  }

  public getClaim(id) {
    this.rest.getClaim(id)
      .then((claim : Claim ) => {
        this.claim = claim;
      });
  }

  public submitTracking(){
    this.rest.updateClaim(this.claim).subscribe(x => {
      this.router.navigate(['admin-details']);
    });
  }

  public onChange(value) {
    console.log(
      "This triggers only when there's a change in the value: ",
      value
    );
    this.claim.status = value;
  }

}
