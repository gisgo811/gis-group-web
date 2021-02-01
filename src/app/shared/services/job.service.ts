import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {AuthService} from "./auth.service";
import {ConfigService} from "./config.service";
import {Job} from "../model/job";

@Injectable({
    providedIn: 'root'
})
export class JobService {
    private baseUrl = this.configService.api + "/jobs";  // URL to web API

    constructor(private http: HttpClient, private authService: AuthService, private configService: ConfigService) {
    }

    getAll(): Observable<any> {
        return this.http.get(this.baseUrl + "/").pipe(map((res: any) => {
            return Array.isArray(res) ? res.map(item => {
                const job = new Job();
                job.fromJSON(item);
                return job;
            }) : []
        }))
    }

    getOne(id: string): Observable<any> {
        return this.http.get(this.baseUrl + "/detail/" + id).pipe(map(res => {
            if (!res) return null;
            const job = new Job();
            job.fromJSON(res);
            return job;
        }))
    }

    create(job: Job): Observable<any> {
        job.create();
        return this.http.post(this.baseUrl + "/create", {job: job.toJSON()});
    }

    update(job: Job): Observable<any> {
        const object = job.toJSON();
        return this.http.post(this.baseUrl + "/" + job._id + "/update", {job: object});
    }

    delete(id: string): Observable<any> {
        return this.http.get(this.baseUrl + "/" + id + "/remove");
    }

    addEditor(job: any, user: any): Observable<any> {
        return this.http.post(this.baseUrl + "/" + job._id + "/editor/create", {user: user});
    }

    removeEditor(id: string, sid: string): Observable<any> {
        return this.http.get(this.baseUrl + "/" + id + "/editor/" + sid + "/remove");
    }

    addFollower(job: any, user: any): Observable<any> {
        return this.http.post(this.baseUrl + "/" + job._id + "/follower/create", {user: user});
    }

    removeFollower(id: string, sid: string): Observable<any> {
        return this.http.get(this.baseUrl + "/" + id + "/follower/" + sid + "/remove");
    }

    createSubJob(job: any, sub: any): Observable<any> {
        sub.create();
        return this.http.post(this.baseUrl + "/" + job._id + "/sub/create", {child: sub.toJSON()});
    }

    updateSubJob(job: any, sub: any): Observable<any> {
        return this.http.post(this.baseUrl + "/" + job._id + "/sub/" + sub._id + "/update", {child: sub.toJSON()});
    }

    deleteSubJob(id: string, sid: string): Observable<any> {
        return this.http.get(this.baseUrl + "/" + id + "/sub/" + sid + "/remove");
    }

    createComment(job: any, comment: any): Observable<any> {
        comment.user = this.authService.user;
        comment.create();
        return this.http.post(this.baseUrl + "/" + job._id + "/comment/create", {comment: comment});
    }

    updateComment(job: any, comment: any): Observable<any> {
        return this.http.post(this.baseUrl + "/" + job._id + "/comment/" + comment._id + "/update", {comment: comment});
    }

    deleteComment(id: string, cid: string): Observable<any> {
        return this.http.get(this.baseUrl + "/" + id + "/comment/" + cid + "/remove");
    }

    /*commit(id: any, workflow: any): Observable<any> {
        let headers = this.authService.getHeader();
        let options = {headers: headers};
        workflow.create();
        return this.http.post(this.configService.api.business_api + '/jobs' + "/" + id + "/commit", {workflow: workflow}, options);
    }

    check(id: any, workflow: any): Observable<any> {
        let headers = this.authService.getHeader();
        let options = {headers: headers};
        return this.http.post(this.configService.api.business_api + '/jobs' + "/" + id + "/check", {workflow: workflow}, options);
    }*/

}
