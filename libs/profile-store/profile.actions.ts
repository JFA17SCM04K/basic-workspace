import { createAction, props } from '@ngrx/store';
import { ProfileState } from '../feature-profile-details/src/lib/models/profile-state.model';
import * as fromProfile from '../profile-store/profile.reducers';
import { UserProfile } from '../feature-profile-details/src/lib/models';

export const getProfile = createAction('[Profile Details Component] Get user profile request')
export const getProfiles = createAction('[Profiles Grid Component] Get user profiles request')
export const reset = createAction('[Profiles Details Component] Clear state')

export const getProfilesSuccess = createAction(
    '[Profile Grid Component] Get user profiles request Success',
    props<{users: UserProfile[]}>(),
)

export const getProfilesFailure = createAction(
    '[Profile Details Component] Get user profiles request Failure',
    props<{err: any}>(),
)

export const getProfileSuccess = createAction(
    '[Profile Details Component] Get user profile request Success',
    props<{users: ProfileState}>(),
)

export const getProfileFailure = createAction(
    '[Profile Details Component] Get user profile request Failure',
    props<{err: any}>(),
)

export const loadUser = createAction(
    '[Profile Grid Component] Select user profile',
    props<{index: string}>(),
)