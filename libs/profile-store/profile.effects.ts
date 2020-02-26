import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import * as fromProfileAction from './profile.actions';
import { FormsService } from './profile.service'; 
import { of } from 'rxjs';
import { ProfileState } from '../feature-profile-details/src/lib/models/profile-state.model';
import * as _ from 'lodash';
import { UserProfile } from '../feature-profile-details/src/lib/models';
import { Action } from '@ngrx/store';
import * as fromProfile from '../profile-store/profile.reducers';

const ONEUSER = 1;
const FIFTEENUSERS = 15;

@Injectable()
export class ProfileEffects {

  // Transform the data returned from the API in desired format
  private _transformData(data){
    /**
     * Args - object containing user details
     * Return - tranformed user details object of type 'UserProfile'
     */

    let tranformUserProfile: UserProfile = {
      // Assign id to every record - Incase of null/'' id - generate and assign a random 10-digit id to the user
      id: (_.get(data, 'id.value', '') ?_.get(data, 'id.value'): Math.floor(Math.random()*10000000000).toString()),
      firstName: _.get(data, 'name.first', ''),
      lastName: _.get(data, 'name.last', ''),
      city: _.get(data, 'location.city', ''),
      state: _.get(data, 'location.state', ''),
      email: _.get(data, 'email', ''),
      phone: _.get(data, 'phone', ''),
      cell: _.get(data, 'cell', ''),
      pictureUrl: _.get(data, 'picture.thumbnail', ''),
    }
    return tranformUserProfile
  }

  /**
   * On Action -- getProfiles
   * Get 15 user data from the API
   * Tranform the data in the dsired format needed by the reducer (UserProfile[])
   * Perform the Action - getProfilesSuccess
   * Incase of API error - perform action - getProfilesFailure and pass error message to the error property of state
   */
  getUserProfilesRequest$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromProfileAction.getProfiles),
      switchMap(() => this.formsService.getRandomUsersFromAPI(FIFTEENUSERS)
      .pipe(
        map((users)=> {
          let userArray = [];
          _.get(users, 'results', []).forEach((user)=>{
            userArray.push(this._transformData(user));
          });
          return userArray;
        }),
        map((userArray: UserProfile[])=> {
          return fromProfileAction.getProfilesSuccess({users: userArray})
        }),
        catchError((error) => {
          console.log("Error while getting user profiles from API", error);
          return of(fromProfileAction.getProfilesFailure({err: error.message}))
        })
      )
    ))
  );

    /**
   * On Action -- getProfile
   * Get 1 user data from the API
   * Tranform the data in the dsired format needed by the reducer (ProfileState)
   * Perform the Action - getProfileSuccess
   * Incase of API error - perform action - getProfileFailure and pass error message to the error property of state
   */
  getUserProfileRequest$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromProfileAction.getProfile),
      switchMap(() => this.formsService.getRandomUsersFromAPI(ONEUSER)
      .pipe(
        map((user)=> {
          let tranformUserProfile: UserProfile = this._transformData(_.get(user, 'results[0]', {}));
          let userProfileState: ProfileState = {
            userProfile: tranformUserProfile
          };
          return userProfileState;
        }),
        map((userProfileState: ProfileState)=> {
          return fromProfileAction.getProfileSuccess({users: userProfileState})
        }),
        catchError((error) => {
          console.log("Error while getting user profile from API", error);
          return of(fromProfileAction.getProfileFailure({err: error.message}))
        })
      )
    ))
  );

  constructor(
    private actions$: Actions,
    private formsService: FormsService
  ) {}
}