import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService} from '../../shared/services/config.service';
import {AuthService} from '../../shared/services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    constructor(private configService: ConfigService, private authService: AuthService, private router: Router) {
        if (this.authService.user) this.router.navigate(["dashboard/welcome"]);
    }

    ngOnInit() {

    }


    /////////////////以下界面交互/////////////////////
    login() {
        window.location.href = "https://github.com/login/oauth/authorize?client_id=" + this.configService.client;
        /*this.authService.login(this.user).subscribe(async res => {
            if (res.result) {
                const user = res.user;
                this.authService.setToken(res.user, res.token);
                if(!user.system){
                    this.modalService.warning({
                        nzTitle: '提示',
                        nzContent: "暂未分配系统"
                    });
                }else{
                    if(user.system.main){
                        this.router.navigate(['/main/dashboard']);
                    }else{
                        if(this.configService.config.dashboard === "default"){
                            this.router.navigate(['/branch/'+ user.system.code + '/dashboard']);
                        }else{
                            this.router.navigate(['/branch/'+ user.system.code + '/dashboard/map']);
                        }
                    }
                }
                this.userLogService.create({
                    action: '登入',
                    user: this.authService.user
                }).subscribe();
            } else {
                this.modalService.warning({
                    nzTitle: '登录失败',
                    nzContent: res.msg
                });
            }
        }, err => {
            this.modalService.warning({
                nzTitle: '登录失败',
                nzContent: err.msg
            });
        });*/
    }
}
