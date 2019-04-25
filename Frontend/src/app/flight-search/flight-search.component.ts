import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service'
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  selectedFlight: any = [];
  allFlightList: any = [];
  formControl: FormGroup;
  options: any[] = [];
  data: any;
  minDate = new Date(2019, 0, 31);
  maxDate = new Date(2019, 0, 31);
  errorMessage: String;
  noData: boolean = false;
  constructor(private service: DataService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.service.getFlightData({}).subscribe((res) => {
      this.allFlightList = res;
    })
    this.formControl = this.formBuilder.group({
      flightNumber: '',
      origin: '',
      destination: '',
      selectedDate: new Date(2019, 0, 31).toISOString()
    });
  }

  getSearchResult(search) {

    this.options = [];
    if (this.formControl.get(search).value.length > 0) {

      let all = this.allFlightList
      let searchedWord = this.formControl.get(search).value

      for (let key in all) {

        let r = all[key][search].search(new RegExp(searchedWord, "i"));
        if (r != -1) {
          this.options.push(all[key][search])
        }
      }
      this.options = Array.from(new Set(this.options.map((item: any) => item)))

    } else {
      this.options = []
    }
  }


  search() {
    let enteredFlightData = this.formControl.value;
    debugger
    if ((enteredFlightData.flightNumber == '') && ((enteredFlightData.origin == '') || (enteredFlightData.destination == '')) || (this.formControl.status == 'INVALID')) {
      this.errorMessage = "Please enter valid flight number or enter your origin and destination"
      return
    } else {
      this.errorMessage = ''
    }
    let requestObject = {
      flightNumber: enteredFlightData.flightNumber,
      origin: enteredFlightData.origin,
      destination: enteredFlightData.destination
    }

    this.service.getFlightData(requestObject).subscribe((res) => {
      this.selectedFlight = res;
      if (this.selectedFlight.length < 1) {
        this.noData = true;
      }
    })
  }
  
  autoSuggestionSelect(event: MatAutocompleteSelectedEvent) {
    this.options.length = 0;
  }

  resetData() {
    this.formControl = this.formBuilder.group({
      flightNumber: '',
      origin: '',
      destination: '',
      selectedDate: new Date(2019, 0, 31).toISOString()
    });
    this.selectedFlight.length = 0;
    this.noData = false;
    this.errorMessage = ''
  }

  lettersOnly(evt) {
    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
      ((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}


