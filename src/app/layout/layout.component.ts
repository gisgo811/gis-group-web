import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    constructor(public authService: AuthService, private router: Router) {
    }

    ngOnInit() {

    }

    quit() {
        this.authService.logout();
        this.router.navigate(["dashboard/login"]);
    }

    edit() {
        this.authService.setUserToStorage(this.authService.user);
    }
}
