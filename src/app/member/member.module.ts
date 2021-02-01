import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {MemberComponent} from './member.component';
import {AuthGuard} from '../shared/services/auth.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: MemberComponent
    }
];

@NgModule({
    declarations: [
        MemberComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class MemberModule {
}
