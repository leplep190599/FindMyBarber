import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-owner',
  templateUrl: './new-owner.component.html',
  styleUrls: ['./new-owner.component.css']
})
export class NewOwnerComponent implements OnInit {
    username = '';
    fullname = '';
  constructor() {

  }

  ngOnInit(): void {
  }

}
