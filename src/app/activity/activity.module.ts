import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ActivityComponent} from './activity.component';
import {AuthGuard} from '../shared/services/auth.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: ActivityComponent
    }
];

@NgModule({
    declarations: [
        ActivityComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class ActivityModule {
}
