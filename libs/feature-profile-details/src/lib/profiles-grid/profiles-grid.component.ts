import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ProfileActions from '../../../../profile-store/profile.actions';
import { UserProfile } from '../../../../feature-profile-details/src/lib/models';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { ProfileState } from '../../../../feature-profile-details/src/lib/models/profile-state.model';
import * as fromProfile from '../../../../../libs/profile-store/profile.reducers';

@Component({
  selector: 'monofunworkspace-profiles-grid',
  templateUrl: './profiles-grid.component.html',
  styleUrls: ['./profiles-grid.component.css']
})
export class ProfilesGridComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userProfile: UserProfile[];
  public error: any = '';
  
  constructor(private store: Store<{userProfileAction: fromProfile.State}>) {
    // Get the state of application
    this.subscription = this.store.select('userProfileAction')
      .subscribe(
        (data)=>{
          this.userProfile = data.users;
          this.error = data.error;
        }
      )
  }

  ngOnInit() {
    // Reset the application State
    this.store.dispatch(ProfileActions.reset());
    // Get 15 User Profiles from the API
    this.store.dispatch(ProfileActions.getProfiles());
  }

  ngOnDestroy() {
    // Unsubscribe
    this.subscription.unsubscribe();
  }
}
