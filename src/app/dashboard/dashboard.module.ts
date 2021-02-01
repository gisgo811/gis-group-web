import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {DashboardComponent} from './dashboard.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AuthGuard} from '../shared/services/auth.guard';

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        children: [
            {
                path: "login",
                component: LoginComponent
            },
            {
                path: "register",
                component: RegisterComponent
            },
            {
                path: "welcome",
                canActivate: [AuthGuard],
                component: WelcomeComponent
            },
            {
                path: "**",
                redirectTo: "login"
            }
        ]
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
        LoginComponent, RegisterComponent, WelcomeComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class DashboardModule {
}
