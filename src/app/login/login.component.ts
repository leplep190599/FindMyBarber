import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginDto} from '../dto/login-dto.model';
import {DataStorageService} from '../data/data-storage.service';
import {Router} from '@angular/router';
import {UserDto} from '../dto/user-dto.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    login = false;
    loginForm: FormGroup;
    loginDto: LoginDto = new LoginDto();
    constructor(private datastorage: DataStorageService,
                private router: Router,
                private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.login = false;
        this.createForm();
    }

    checkLogin(formvalue) {
        this.loginDto.username = formvalue.username;
        this.datastorage.login(formvalue).subscribe((data: UserDto) => {
            if (data.role === 'admin') {
                this.login = true;
                this.datastorage.setUser(data);
                this.router.navigate(['account']);
            }
        });
    }

    createForm() {
        this.loginForm = this.formBuilder.group({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }

}
