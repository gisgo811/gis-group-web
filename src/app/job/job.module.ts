import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {JobComponent} from './job.component';
import {JobDialogComponent} from './job-dialog/job-dialog.component';
import {AuthGuard} from '../shared/services/auth.guard';


const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: JobComponent
    }
];

@NgModule({
    declarations: [
        JobComponent, JobDialogComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class JobModule {
}
