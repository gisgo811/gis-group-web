import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {JobService} from '../shared/services/job.service';

@Component({
    selector: 'app-job',
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

    status = [
        {label: "Open", value: 0, checked: true},
        {label: "Close", value: 1, checked: true}
    ];
    categories = [
        {label: "社团网站", value: 0, checked: true},
        {label: "社团活动", value: 1, checked: true},
        {label: "社团制度", value: 2, checked: true},
        {label: "API开发", value: 3, checked: true},
        {label: "API网站", value: 4, checked: true},
        {label: "Server开发", value: 5, checked: true},
        {label: "Manager网站", value: 6, checked: true},
        {label: "Tool开发", value: 7, checked: true}
    ];


    _jobs: any = [];

    jobs: any = [];

    constructor(private jobService: JobService) {
    }

    ngOnInit() {
        this.jobService.getAll().subscribe(res => {
            this._jobs = res;
            this.filter();
        });
    }

    filter() {
        this.jobs = this._jobs.filter(job => {
            const status = this.status.find(item => item.checked && job.status == item.value);
            if (!status) return false;
            const category = this.categories.find(item => item.checked && job.category == item.value);
            if (!category) return false;
            return true;
        });
    }

}
