import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import {Subject} from 'rxjs/Subject';
import {DataStorageService} from './data/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    dtTrigger: Subject<any> = new Subject<any>();
    public userList = Array();
    headerRow: string[];
    dtOptions: DataTables.Settings = {};
     constructor(public location: Location, private dataStorage: DataStorageService) {}

    ngOnInit(){
        this.headerRow = ['No', 'User ID', 'Email', 'Name', 'Role', 'Phone number', 'Address'];
        this.dataStorage.fetchAllUsers().subscribe(
            (data: any) => {
                data.forEach(
                    (dto: any) => {
                        if (dto.role === 'owner') {
                            this.userList.push(dto);
                        }
                    }
                );
                this.dtTrigger.next();
            }
        );
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true
        };
    }

    isMap(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
        return false;
      }
      else {
        return true;
      }
    }

}
