import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'member',
                loadChildren: () => import('./member/member.module').then(m => m.MemberModule)
            },
            {
                path: 'activity',
                loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule)
            },
            {
                path: 'job',
                loadChildren: () => import('./job/job.module').then(m => m.JobModule)
            },
            {
                path: 'article',
                loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
            },
            {
                path: '**',
                redirectTo: 'dashboard'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
