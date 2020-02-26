import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from '../../../../libs/ui/src';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InfoComponent } from './info.component';
import { HttpClientModule } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from '../../../../libs/profile-store/profile.effects';
import { reducer } from '../../../../libs/profile-store/profile.reducers';

import { ProfilesGridComponent } from '../../../../libs/feature-profile-details/src/lib/profiles-grid/profiles-grid.component';

@NgModule({
  declarations: [AppComponent, InfoComponent, ProfilesGridComponent],
  imports: [
    BrowserModule,
    UiModule,
    MatToolbarModule,
    HttpClientModule,
    EffectsModule.forRoot([ProfileEffects]),
    RouterModule.forRoot(
      [
        {
          path: '',
          pathMatch: 'full',
          component: InfoComponent
        },
        {
          path: 'profile-details',
          pathMatch: 'full',
          loadChildren: () =>
            import('@monofunworkspace/feature-profile-details').then(
              module => module.FeatureProfileDetailsModule
            )
        },
        {
          path: 'profile-details/:id',
          pathMatch: 'full',
          loadChildren: () =>
            import('@monofunworkspace/feature-profile-details').then(
              module => module.FeatureProfileDetailsModule
            )
        },
        {
          path: 'profiles-grid',
          pathMatch: 'full',
          component: ProfilesGridComponent
        }
      ],
      { initialNavigation: 'enabled' }
    ),
    StoreModule.forRoot(
      {userProfileAction: reducer},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
