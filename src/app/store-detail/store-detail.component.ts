import {Component, OnInit, PipeTransform} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DataStorageService} from '../data/data-storage.service';
import {StoreDto} from '../dto/store-dto.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {UpdateStoreDto} from '../dto/update-store-dto.model';
import {UserDto} from '../dto/user-dto.model';

@Component({
    selector: 'app-store-detail',
    templateUrl: './store-detail.component.html',
    styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {
    store: StoreDto;
    storeForm: FormGroup;
    isUpdate = true;
    open_time: Date = new Date();
    close_time: Date = new Date();
    splitted: string[];
    owner: UserDto = new UserDto();
    updateStoreDto: UpdateStoreDto;

    constructor(private route: ActivatedRoute,
                private dataStorage: DataStorageService,
                private formBuilder: FormBuilder,
                private router: Router,
                private datePipe: DatePipe
    ) {
    }

    ngOnInit(): void {
        this.createForm();
        this.route.params.subscribe((param: Params) => {
            this.isUpdate = !!param['id'];
            if (this.isUpdate) {
                this.dataStorage.getStoreByOwnerId(+param['id']).subscribe((data: any) => {
                    this.store = data;
                    this.dataStorage.getUserByID(this.store.user_id).subscribe((user: any) => {
                        this.storeForm = this.formBuilder.group({
                            id: new FormControl(this.store.id, Validators.required),
                            name: new FormControl(this.store.name, Validators.required),
                            description: new FormControl(this.store.description, Validators.required),
                            address: new FormControl(this.store.address, Validators.required),
                            user_id: new FormControl(this.store.user_id, Validators.required),
                            open_time: new FormControl(this.datePipe.transform(this.store.open_time, 'HH:mm'), Validators.required),
                            close_time: new FormControl(this.datePipe.transform(this.store.close_time, 'HH:mm'), Validators.required),
                            username: new FormControl(user.username , Validators.required)
                        });
                    });
                });
            }
        })
    }

    updateStore(formValue) {
        this.updateStoreDto = new UpdateStoreDto();
        this.updateStoreDto.id = formValue.id;
        this.updateStoreDto.name = formValue.name;
        this.updateStoreDto.description = formValue.description;
        this.updateStoreDto.address = formValue.address;
        this.splitted = formValue.open_time.split(':', 2);
        this.open_time.setHours(+this.splitted[0]);
        this.open_time.setMinutes(+this.splitted[1]);
        this.splitted = formValue.close_time.split(':', 2);
        this.close_time.setHours(+this.splitted[0]);
        this.close_time.setMinutes(+this.splitted[1]);
        this.updateStoreDto.open_time = this.datePipe.transform(this.open_time, 'yyyy-MM-dd HH:mm:ss') + '';
        this.updateStoreDto.close_time = this.datePipe.transform(this.close_time, 'yyyy-MM-dd HH:mm:ss') + '';
        this.updateStoreDto.user_id  = formValue.user_id;
        if (this.isUpdate) {
            this.dataStorage.updateStore(this.updateStoreDto).subscribe(data => {
                this.router.navigate(['/store']);
            }, error => {
                this.router.navigate(['/store']);
            } );
        } else {
        }
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

}
