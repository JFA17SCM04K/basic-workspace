import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { UserProfile } from '../../../../feature-profile-details/src/lib/models';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../../feature-profile-details/src/lib/models/profile-state.model';
import * as ProfileActions from '../../../../profile-store/profile.actions';
import * as _ from 'lodash';

@Component({
  selector: 'monofunworkspace-profile-grid',
  templateUrl: './profile-grid.component.html',
  styleUrls: ['./profile-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileGridComponent implements OnInit {
  @Input() users: UserProfile[];

  displayedColumns: string[] = ['pictureUrl', 'name', 'email'];

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {}

  goToProfile(index: number) {
    // Fetch the userId
    let userId = _.get(this.users[index],'id','');
    // Navigate to profile-details route with userId as the optional param
    this.router.navigate(['/profile-details', userId],{relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
