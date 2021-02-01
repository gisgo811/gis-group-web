import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {AuthService} from "./auth.service";
import {ConfigService} from "./config.service";
import {User} from "../model/user";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService  {
    private baseUrl = this.configService.api + '/users';  // URL to web API

    private subject: any = {
        create: new Subject<any>(),
        delete: new Subject<any>(),
        update: new Subject<any>(),
        refresh: new Subject<any>()
    };

    constructor(private http: HttpClient, private authService: AuthService, private configService: ConfigService) {
    }

    on(event, callback){
        return this.subject[event].subscribe( value => callback(value) );
    }

    emit(event, value: any) {
        return this.subject[event].next(value);
    }

    create(user: User): Observable<any> {
        user.create();
        return this.http.post(this.baseUrl + '/create', {user: user.toJSON()});
    }

    delete(id: string): Observable<any> {
        return this.http.get(this.baseUrl + '/' + id + '/remove');
    }

    update(user: User): Observable<any> {
        return this.http.post(this.baseUrl + '/' + user._id + '/update', {user: user.toJSON()});
    }

    getAll(): Observable<any> {
        return this.http.get(this.baseUrl + '/').pipe(map( (res:any) => {
            return res.map(item => {
                const user = new User();
                user.fromJSON(item);
                return user;
            });
        }));
    }

    getOne(id: string): Observable<any> {
        return this.http.get(this.baseUrl + '/detail/' + id).pipe(map(item => {
            const user = new User();
            user.fromJSON(item);
            return user;
        }));
    }

}
