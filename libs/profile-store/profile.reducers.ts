import { Action, createReducer, on, createSelector } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { filter } from 'rxjs/operators';
import { ProfileState } from '../feature-profile-details/src/lib/models/profile-state.model';
import { UserProfile } from '../feature-profile-details/src/lib/models/profile.model';

export interface State {
    users: UserProfile[],
    loadedUser: ProfileState,
    error: any
}

export const initialState: State = {
    users: [],
    loadedUser: {userProfile: {
        id: '',
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        email: '',
        phone: '',
        cell: '',
        pictureUrl: ''
    }},
    error: ''
}

const scoreboardReducer = createReducer(
    initialState,
    // Action - reset - clear the state before getting 15 user information from the API.
    on(
        ProfileActions.reset,
        (state) => ({
            ...state,
            users: initialState.users,
            loadedUser: initialState.loadedUser
    })),
    // Action - getProfile - returns the application state
    on(
        ProfileActions.getProfile, 
        state => ({
        ...state,
        error: ''
    })),
    // Action - getProfileSuccess - Add the user returned from the API to the users array and set error as ''
    on(
        ProfileActions.getProfileSuccess, 
        (state, {users}) => {
        return {
            ...state,
            users: [...state.users, users.userProfile],
            loadedUser: users,
            error: ''
        }
    }),
    /// Action - getProfilesFailure/getProfileFailure - add the error to the error peoperty of the state for error handling
    on(
        ProfileActions.getProfileFailure, 
        ProfileActions.getProfilesFailure,
        (state, err) => {
        return {
            ...state,
            error: err.err
        }
    }),
    on(
        ProfileActions.getProfiles, state => ({
        ...state,
        error: ''
    })),
    // Action - getProfilesSuccess - Add the array of Users returned from the API to the users array os the state and set error as ''
    on(
        ProfileActions.getProfilesSuccess, 
        (state, {users}) => {
        return {
            ...state,
            users: [...state.users, ...users],
            error: ''
        }
    }),
    // Action - loadUser - adds the selected user to the loadedUser property
    on(
        ProfileActions.loadUser, 
        (state, {index}) => {
        
        // Filter the array of objs matching the selected user id
        let userToBeLoaded = state.users.filter(user => index === user.id); 
        let finalUser;
        // If user is present - load the user to the loadedUser property
        if(userToBeLoaded[0]) {
            finalUser = userToBeLoaded[0];
        } else { // Set loadedUser as the initialState - handles scenario if user tries to manipulate profile-details/:id route with any random id that is not present in the state
            finalUser = initialState.loadedUser.userProfile;
        }
        return {
            ...state,
            loadedUser: {userProfile: finalUser},
            error: ''
        }
    }),
  );


  export function reducer(state: State | undefined, action: Action) {
    console.log("#ACTION -", action);
    console.log("#PREVIOUS STATE -", state);
    return scoreboardReducer(state, action);
  }
