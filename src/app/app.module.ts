import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigService} from './shared/services/config.service';
import {SharedModule} from './shared/shared.module';
import {LayoutModule} from './layout/layout.module';

/** 导入需要使用的 Angular 语言包 **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

/** 配置 ng-zorro-antd 国际化 **/
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        LayoutModule,
        SharedModule,
        LoadingBarHttpClientModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (config: ConfigService) => async () => {
                return config.load('assets/jsons/config.json');
            },
            deps: [ConfigService],
            multi: true
        },
        {provide: NZ_I18N, useValue: zh_CN}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
