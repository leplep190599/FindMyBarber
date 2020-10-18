import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../data/data-storage.service';
import {UserDto} from '../dto/user-dto.model';
import {Subject} from 'rxjs/Subject';
import {logger} from 'codelyzer/util/logger';
import {DataTableDirective} from 'angular-datatables';

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy {
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtTrigger: Subject<any> = new Subject<any>();
    public userList: any[] = [];
    headerRow: string[];
    dtOptions: DataTables.Settings = {};
    constructor(private dataStorage: DataStorageService) {
        this.headerRow = ['No', 'User ID', 'Email', 'Name', 'Role', 'Phone number', 'Address'];
        this.dataStorage.fetchAllUsers().subscribe(
            (data: any) => {
                this.userList = data;
                this.dtTrigger.next();
            }
        );
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true
        };
    }

    ngOnInit(): void {
        // this.headerRow = ['No', 'User ID', 'Email', 'Name', 'Role', 'Phone number', 'Address'];
        // this.dataStorage.fetchAllUsers().subscribe(
        //     (data: any) => {
        //         this.userList = data;
        //         this.dtTrigger.next();
        //     }
        // );
        // this.dtOptions = {
        //     pagingType: 'full_numbers',
        //     pageLength: 10,
        //     processing: true
        // };
    }

    deleteUser(user: UserDto): void {
        this.dataStorage.deleteUser(user.id).subscribe( data => {}, error => {
            this.dataStorage.fetchAllUsers().subscribe(
                (data: any) => {
                    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                        dtInstance.destroy();
                        this.userList = data;
                        this.dtTrigger. next();
                    }) ;
                }
            );
        });
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }
}
