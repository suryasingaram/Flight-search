import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getFlightData(data) {
    return this.http.post('http://localhost:8080/getFlights', data)
  }



}
