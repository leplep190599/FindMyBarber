import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DataTableDirective} from 'angular-datatables';
import {DataStorageService} from '../data/data-storage.service';
import {UserDto} from '../dto/user-dto.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StoreDto} from '../dto/store-dto.model';
import {UpdateStoreDto} from '../dto/update-store-dto.model';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}
@Component({
    selector: 'app-list-owner',
    templateUrl: './list-owner.component.html',
    styleUrls: ['./list-owner.component.css']
})
export class ListOwnerComponent implements OnInit, OnDestroy {
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtTrigger: Subject<any> = new Subject<any>();
    public userList: any[] = [];
    headerRow: string[];
    ownerSelected = false;
    dtOptions: DataTables.Settings = {};

    store: StoreDto;
    storeForm: FormGroup;
    isUpdate = true;
    open_time: Date = new Date();
    close_time: Date = new Date();
    splitted: string[];
    updateStoreDto: UpdateStoreDto;

    constructor(private dataStorage: DataStorageService,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private router: Router,
                private datePipe: DatePipe
    ) {
        this.headerRow = ['No', 'User ID', 'Email', 'Name', 'Role', 'Phone number', 'Address'];
        this.dataStorage.fetchAllUsers().subscribe(
            (data: any) => {
                this.userList = data;
                this.userList = this.userList.filter(s => s.role === 'owner');
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

    selectOwner(user) {
        this.ownerSelected = true;
        this.createForm();
        this.storeForm.setControl('username', new FormControl(user.username, Validators.required));
        this.storeForm.setControl('user_id', new FormControl(user.id, Validators.required));
    }


    createForm() {
        this.storeForm = this.formBuilder.group({
            id: new FormControl(null, Validators.required),
            name: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            address: new FormControl(null, Validators.required),
            user_id: new FormControl(null, Validators.required),
            open_time: new FormControl(null, Validators.required),
            close_time: new FormControl(null, Validators.required),
            username: new FormControl(null, Validators.required)
        });
    }

    createStore(formValue) {
        this.updateStoreDto = new UpdateStoreDto();
        this.updateStoreDto.id = formValue.id;
        this.updateStoreDto.name = formValue.name;
        this.updateStoreDto.description = formValue.description;
        this.updateStoreDto.address = formValue.address;
        this.splitted = formValue.open_time.split(':', 2);
        this.updateStoreDto.open_time = this.splitted[0];
        this.updateStoreDto.close_time = this.splitted[1];
        this.updateStoreDto.user_id  = formValue.user_id;
        console.log(this.updateStoreDto);
        if (this.isUpdate) {
            this.dataStorage.createStore(this.updateStoreDto).subscribe(data => {
                this.router.navigate(['/store']);
            }, error => {
                this.router.navigate(['/store']);
            } );
        } else {
        }
    }

}

