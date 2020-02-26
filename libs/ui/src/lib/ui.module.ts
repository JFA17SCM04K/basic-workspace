import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ProfileGridComponent } from './profile-grid/profile-grid.component';

@NgModule({
  imports: [ 
    CommonModule, 
    MatCardModule, 
    MatButtonModule,
    MatTableModule
   ],
  declarations: [ ProfileCardComponent, ProfileGridComponent ],
  exports: [ ProfileCardComponent, ProfileGridComponent ]
})
export class UiModule {}
