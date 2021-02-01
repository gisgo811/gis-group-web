import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ArticleComponent} from './article.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {ArticleListComponent} from './article-list/article-list.component';

const routes: Routes = [
    {
        path: '',
        component: ArticleComponent,
        children: [
            {
                path: 'list',
                component: ArticleListComponent
            },
            {
                path: 'detail',
                component: ArticleDetailComponent
            },
            {
                path: '**',
                redirectTo: 'list'
            }
        ]
    }
];

@NgModule({
    declarations: [
        ArticleComponent, ArticleDetailComponent, ArticleListComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class ArticleModule {
}
