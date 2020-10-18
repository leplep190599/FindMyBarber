import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FooterModule} from './shared/footer/footer.module';
import {SidebarModule} from './sidebar/sidebar.module';

import {AppComponent} from './app.component';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {ListUsersComponent} from './list-users/list-users.component';
import {ListOwnerComponent} from './list-owner/list-owner.component';
import {ListStoreComponent} from './list-store/list-store.component';
import {NewUserComponent} from './new-user/new-user.component';
import {OwnerDetailComponent} from './owner-detail/owner-detail.component';
import {NewOwnerComponent} from './new-owner/new-owner.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';
import {NewStoreComponent} from './new-store/new-store.component';
import {DataTablesModule} from 'angular-datatables';
import { TestFormComponent } from './test-form/test-form.component';
import {DatePipe} from '@angular/common';
import { LoginComponent } from './login/login.component';
@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        AppRoutingModule,
        DataTablesModule

    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        ListUsersComponent,
        ListOwnerComponent,
        ListStoreComponent,
        NewUserComponent,
        OwnerDetailComponent,
        NewOwnerComponent,
        StoreDetailComponent,
        NewStoreComponent,
        TestFormComponent,
        LoginComponent
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule {
}
