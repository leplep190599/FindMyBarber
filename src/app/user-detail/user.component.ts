import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DataStorageService} from '../data/data-storage.service';
import {UserDto} from '../dto/user-dto.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: UserDto;
  updateForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private dataStorage: DataStorageService,
              private formBuilder: FormBuilder
              ) { }


  ngOnInit() {
      this.updateForm = this.formBuilder.group({
          userId: new FormControl('ahihi')
          // userName: ['', Validators.required],
          // phone: ['', Validators.required],
          // fullname: ['', Validators.required],
          // role: ['', Validators.required],
          // address: ['', Validators.required]
      });
    this.route.params.subscribe((param: Params) => {
        this.dataStorage.getUserByID(+param['id']).subscribe((data: any) => {
            this.user = data;
        });
    })

  }

  updateProfile(): void {

  }

}
