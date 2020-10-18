import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../data/data-storage.service';
import {Subject} from 'rxjs/Subject';
import {UserDto} from '../dto/user-dto.model';
import {DataTableDirective} from 'angular-datatables';
declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}
@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.css']
})
export class ListStoreComponent implements OnInit, OnDestroy {
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtTrigger: Subject<any> = new Subject<any>();
    public storeList: [];
    headerRow: string[];
    dtOptions: DataTables.Settings = {};
    constructor(private dataStorage: DataStorageService) { }

  ngOnInit(): void {
      this.headerRow = [ 'No', 'StoreID', 'StoreName', 'Address', 'Open Time', 'Close Time'];
      this.dataStorage.fetchAllStores().subscribe(
          (data: any) => {
              this.storeList = data;
              this.dtTrigger.next();
          }
      );
      this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true
      };
  }

    deleteStore(store) {
        this.dataStorage.deleteStore(store.id).subscribe( data => {}, error => {
            this.dataStorage.fetchAllStores().subscribe(
                (data: any) => {
                    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                        dtInstance.destroy();
                        this.storeList = data;
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
