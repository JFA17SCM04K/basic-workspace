import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FormsService {
    private retrieveFields = `name,location,email,phone,cell,id,picture`;

    constructor(private http: HttpClient){}

    getRandomUsersFromAPI(numUsers) {
        // Retrieving only specific fields from the API to optimize the request response
        let queryParams = numUsers+`&inc=`+this.retrieveFields;
        let url = `https://randomuser.me/api?results=`+queryParams;

        return this.http.get(url);
    }
}