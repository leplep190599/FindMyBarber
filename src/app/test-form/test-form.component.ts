import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DataStorageService} from '../data/data-storage.service';
import {UserDto} from '../dto/user-dto.model';

@Component({
    selector: 'app-test-form',
    templateUrl: './test-form.component.html',
    styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {

    user: UserDto;
    testForm: FormGroup;
    isUpdate = true;
    isOwner = false;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private dataStorage: DataStorageService) {
    }

    ngOnInit(): void {
        this.createForm();
        this.user = new UserDto();
        this.route.params.subscribe((param: Params) => {
            this.isUpdate = !!param['id'];
            if (this.isUpdate) {
                this.dataStorage.getUserByID(+param['id']).subscribe((data: any) => {
                    this.user = data;
                    this.testForm = this.formBuilder.group({
                        userId: new FormControl(this.user.id),
                        userName: new FormControl(this.user.username, Validators.required),
                        phone: new FormControl(this.user.phone_no, [Validators.required, Validators.pattern('[0-9]{10}')]),
                        fullname: new FormControl(this.user.name, Validators.required),
                        role: new FormControl(this.user.role, Validators.required),
                        address: new FormControl(this.user.address, Validators.required)
                    });
                    if (this.user.role === 'owner') {
                        this.isOwner = true;
                    } else {
                        this.isOwner = false;
                    }
                });
            }

        });
    }
    updateProfile(formvalue) {
        if (this.isOwner) {
            formvalue.role = 'owner';
        } else {
            formvalue.role = 'member';
        }
        this.user.role = formvalue.role;
        this.user.name = formvalue.fullname;
        this.user.username = formvalue.userName;
        this.user.address = formvalue.address;
        this.user.phone_no = formvalue.phone + '';
        console.log(this.user);
        if (this.isUpdate) {
            this.dataStorage.updateAccount(this.user).subscribe(data => {
                this.router.navigate(['/account']);
            }, error => {
                this.router.navigate(['/account']);
            } );
        } else {
            this.user.id = 0;
            this.user.avatar = '';
            this.user.password = 'test123';
            this.dataStorage.createAccount(this.user).subscribe(data => {}, error1 => {
                this.router.navigate(['/account']);
            });
        }

    }

    createForm() {
        this.testForm = this.formBuilder.group({
            userId: new FormControl(null, Validators.required),
            userName: new FormControl(null, Validators.required),
            phone: new FormControl(null, Validators.required),
            fullname: new FormControl(null, Validators.required),
            role: new FormControl('member', Validators.required),
            address: new FormControl(null, Validators.required)
        });
    }
}
