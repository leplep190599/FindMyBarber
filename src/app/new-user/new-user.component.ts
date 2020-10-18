import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserDto} from '../dto/user-dto.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {DataStorageService} from '../data/data-storage.service';
@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
    user: UserDto;
    testForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService) {
    }

    ngOnInit(): void {
        this.createForm();
    }
    createAccount(formvalue) {
        this.dataStorage.createAccount(formvalue).subscribe((data: any) => {
            console.log(data);
        });
    }

    createForm() {
        this.testForm = this.formBuilder.group({
            userId: null,
            userName: null,
            phone: null,
            fullname: null,
            role: null,
            address: null
        });
    }

}
