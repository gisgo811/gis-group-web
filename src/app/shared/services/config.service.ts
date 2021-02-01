import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    public config : any;

    //use
    public api: any; //this.city_list[this.city_name].web_api;
    public client: any;
    //public web_api: string = "http://localhost:3000"; //this.city_list[this.city_name].web_api;

    constructor(private http: HttpClient) {
    }

    load(url) : any {
        return new Promise((resolve) => {
            this.http.get((url || "assets/jsons/config.json") + '?v=' + (new Date()).getTime())
                .subscribe((data :any) => {
                    this.config = data;
                    this.api = data.api;
                    this.client = data.client;
                    resolve();
                });
        });
    }



}
