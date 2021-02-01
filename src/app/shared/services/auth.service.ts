import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    localstorage_user_key: string = 'greengis_user';

    user: any;
    private baseUrl = this.configService.api;  // URL to web API

    constructor(private http: HttpClient, private configService: ConfigService) {
    }

    auth(user: any): any {
        return this.http.post(this.baseUrl + "/auth", {user: user});
    }

    github(code: string): any {
        return this.http.post(this.baseUrl + "/github", {code: code});
    }


    getUserFromStorage() {
        if (!this.user) {
            this.user = new User();
            this.user.fromJSON(JSON.parse(localStorage.getItem(this.localstorage_user_key)));
        }
        return this.user;
    }

    setUserToStorage(user: any) {
        this.user = user;
        localStorage.setItem(this.localstorage_user_key, JSON.stringify(user));
    }

    canActivate() {
        if (localStorage.getItem(this.localstorage_user_key)) {
            return true;
        } else {
            return false;
        }
    }

    logout() {
        this.user = null;
        localStorage.removeItem(this.localstorage_user_key);
    }


}
