import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from '../../shared/services/config.service';
import {concatMap} from 'rxjs/operators';
import {AuthService} from '../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/model/user';
import {NzMessageService} from 'ng-zorro-antd/message';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    validateForm: FormGroup;
    shown: boolean;
    user: User = new User();

    constructor(private fb: FormBuilder, private configService: ConfigService, private route:ActivatedRoute, private authService: AuthService, private router: Router, private userService: UserService, private messageService: NzMessageService) {
        this.validateForm = this.fb.group({
            github: ['', [Validators.required]],
            name: ['', [Validators.required]],
            develop: ['', [Validators.required]],
            language: ['', [Validators.required]],
            city: ['', [Validators.required]],
            college: ['', [Validators.required]],
            major: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.route.queryParamMap.pipe(concatMap(x => this.authService.github(x.get("code")) )).subscribe((data: any) => {
            if (!data.user) {
                this.user.github = data.login;
                this.user.head = data.avatar_url;
                this.shown = true;
            } else {
                data.user.head = data.avatar_url;
                this.user.fromJSON(data.user);
                this.authService.setUserToStorage(this.user);
                this.router.navigate(["dashboard/welcome"]);
            }
        });

    }


    /////////////////以下界面交互/////////////////////

    quit() {
        this.authService.logout();
        this.router.navigate(["dashboard/login"]);
    }

    submit() {
        this.userService.create(this.user).subscribe(res => {
            this.user.code = res.user.code;
            this.authService.setUserToStorage(this.user);
            this.router.navigate(["dashboard/welcome"]);
        })
    }

}
