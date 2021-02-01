import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMessageModule } from 'ng-zorro-antd/message';
import {UserDialogComponent} from './components/user-dialog/user-dialog.component';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import {Tabset2Component} from './components/tabset2/tabset2.component';
import {Tab2Component} from './components/tabset2/tab2/tab2.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        NzButtonModule,
        NzInputModule, NzDatePickerModule,
        NzRadioModule,
        NzCheckboxModule,
        NzFormModule,
        NzModalModule, NzMessageModule,
        NzGridModule, NzTabsModule,
        NzSpinModule, NzBadgeModule, NzTagModule,
        NzDropDownModule
    ],
    declarations: [
        UserDialogComponent, Tabset2Component, Tab2Component
    ],
    providers: [
    ],
    exports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        NzButtonModule,
        NzInputModule, NzDatePickerModule,
        NzRadioModule,
        NzCheckboxModule,
        NzFormModule,
        NzModalModule, NzMessageModule,
        NzGridModule, NzTabsModule,
        NzSpinModule, NzBadgeModule, NzTagModule,
        NzDropDownModule,
        UserDialogComponent, Tabset2Component, Tab2Component
    ]
})
export class SharedModule {
}
