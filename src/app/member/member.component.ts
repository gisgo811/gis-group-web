import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserService} from '../shared/services/user.service';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

    develops = [
        {label: "前端工程师", value: 0, checked: true},
        {label: "后端工程师", value: 1, checked: true},
        {label: "全栈工程师", value: 2, checked: true},
        {label: "界面设计师", value: 3, checked: true},
        {label: "数据分析师", value: 4, checked: true}
    ];
    languages = [
        {label: "JavaScript", value: 0, checked: true},
        {label: ".Net(C#)", value: 1, checked: true},
        {label: "Java", value: 2, checked: true},
        {label: "Python", value: 3, checked: true},
        {label: "C++", value: 4, checked: true}
    ];
    cities = [
        {label: "全部", value: "全部", checked: true},
        {label: "北京", value: "北京", checked: true},
        {label: "上海", value: "上海", checked: true},
        {label: "广州", value: "广州", checked: true},
        {label: "深圳", value: "深圳", checked: true},
        {label: "武汉", value: "武汉", checked: true},
        {label: "杭州", value: "杭州", checked: true},
        {label: "南京", value: "南京", checked: true},
        {label: "成都", value: "成都", checked: true},
        {label: "苏州", value: "苏州", checked: true},
        {label: "西安", value: "西安", checked: true}
    ];

    _members: any = [];

    members: any = [];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getAll().subscribe(res => {
            this._members = res;
            this.filter();
        });
    }

    filter() {
        this.members = this._members.filter(member => {
            const develop = this.develops.find(item => item.checked && member.develop == item.value);
            if (!develop) return false;
            const language = this.languages.find(item => item.checked && member.language == item.value);
            if (!language) return false;
            const city = this.cities.find(item => item.checked && member.city == item.value);
            if (!city && !this.cities[0].checked) return false;
            return true;
        });
    }

}
