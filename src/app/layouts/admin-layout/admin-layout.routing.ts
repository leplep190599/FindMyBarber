import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user-detail/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {ListUsersComponent} from '../../list-users/list-users.component';
import {ListOwnerComponent} from '../../list-owner/list-owner.component';
import {ListStoreComponent} from '../../list-store/list-store.component';
import {NewUserComponent} from '../../new-user/new-user.component';
import {OwnerDetailComponent} from '../../owner-detail/owner-detail.component';
import {NewOwnerComponent} from '../../new-owner/new-owner.component';
import {StoreDetailComponent} from '../../store-detail/store-detail.component';
import {NewStoreComponent} from '../../new-store/new-store.component';
import {TestFormComponent} from '../../test-form/test-form.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    // { path: 'accounts',           component: TestFormComponent},
    { path: 'accounts',           component: ListUsersComponent},
    { path: 'owners',           component: ListOwnerComponent},
    // { path: 'accounts/edit/:id', component: UserComponent},
    { path: 'accounts/edit/:id', component: TestFormComponent},
    { path: 'accounts/new', component: TestFormComponent},
    { path: 'store',           component: ListStoreComponent },
    { path: 'store/edit/:id', component: StoreDetailComponent},
    { path: 'store/new', component: ListOwnerComponent},
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
