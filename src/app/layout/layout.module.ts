import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {LayoutComponent} from './layout.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule,
        SharedModule
    ],
    declarations: [
        LayoutComponent
    ],
    providers: [

    ]
})
export class LayoutModule {
}
