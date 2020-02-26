import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ProfileActions from '../../../../profile-store/profile.actions';
import { UserProfile } from '../../../../feature-profile-details/src/lib/models';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { ProfileState } from '../../../../feature-profile-details/src/lib/models/profile-state.model';
import * as fromProfile from '../../../../../libs/profile-store/profile.reducers';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'monofunworkspace-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  private idParams;
  private userData: ProfileState;
  public error: any = '';

  constructor(private route: ActivatedRoute,
              private store: Store<{userProfileAction: fromProfile.State}>) {}

  ngOnInit() {
    // Get application State
    this.subscription = this.store.select('userProfileAction')
    .subscribe( 
      (userProfile) => {
        this.userData = userProfile.loadedUser;
        this.error = userProfile.error;
      }
    );
      
      this.idParams = this.route.snapshot.params['id'];
      // If the optional params is present - load the user from the State
      if (this.idParams) {
        this.store.dispatch(ProfileActions.loadUser({index: this.idParams}));
      } else {
        // If the params is not present - get a random user from the API
        this.store.dispatch(ProfileActions.getProfile());
      }
   }

   ngOnDestroy() {
    // Unsubscribe
    this.subscription.unsubscribe();
   }
}
