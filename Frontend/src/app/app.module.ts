import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { DataService } from './services/data.service';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { MatButtonModule, MatFormFieldModule, MatNativeDateModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker'
@NgModule({
  declarations: [
    AppComponent,
    FlightSearchComponent

  ],
  imports: [
    MatDatepickerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule, MatNativeDateModule,
    MatButtonModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule
  ],
  bootstrap: [AppComponent],
  providers: [DataService]
})
export class AppModule { }
