import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule, MatCardModule, MatInputModule, MatOptionModule, MatSelectModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';

import { UiModule } from './ui/ui.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutComponent } from './layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { InsertDataComponent } from './insert-data/insert-data.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateDataComponent } from './update-data/update-data.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    InsertDataComponent,
    ViewDataComponent,
    UpdateDataComponent
  ],
  imports: [
    UiModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UpdateDataComponent]
})
export class AppModule { }
