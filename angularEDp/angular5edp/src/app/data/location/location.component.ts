import { Component, OnInit ,ViewEncapsulation,ViewChild,ElementRef} from '@angular/core';
import {Router} from "@angular/router";
import { DataService } from '../data.service';
import { JsonApiService } from "app/core/api/json-api.service";
import {ModalDirective} from "ngx-bootstrap";
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {NotificationService} from "../../shared/utils/notification.service";
declare var $: any;
@Component({
  selector: 'app-loction',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css','../../smart-admin.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DataService,ConfirmationService],
  
})
export class LocationComponent implements OnInit {
  
  rows: any[] = [];
  temp:any[]=[];
  driverData:any=[];
  locationData:any[] = [];
  controls={filter:''}
  public information={url:'',id:'',type:'',status:'',driver:'',user:'',db:'',member:'',modified:'',name:'',description:'',host:'',password:'',port:'',created:'',properties:''}
  constructor(private jsonApiService:JsonApiService,private httpService: HttpClient,public dataService:DataService,private notificationService: NotificationService,private confirmationService: ConfirmationService) { }
   @ViewChild('myTable') table: any;
   @ViewChild('staticModal') public staticModal:ModalDirective;
  ngOnInit() {
    
    this.httpService.get('./assets/dbDriver.json').subscribe(
      data => {
       
        this.driverData = data;	 // FILL THE ARRAY WITH DATA.
         
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );

  this.getLocations()
  }


   updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return !val || ['name', 'host', 'type'].some((field: any)=>{
        return d[field].toLowerCase().indexOf(val) !== -1
      }) 
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  save(locationinfo){
    console.log(locationinfo);
       if(locationinfo.id){
         console.log("update api")
         this.dataService.updateLocation(locationinfo).subscribe(
       data => {
          
              this.notificationService.smallBox({
               title: "Success",
               content: "Data has been updated Successfully",
               color: "#739E73",
               iconSmall: "fa fa-check",
               timeout: 5000
           });

          
         
       }
    );
       }else{
       this.dataService.addLocation(locationinfo).subscribe(
       data => {
          
              this.notificationService.smallBox({
               title: "Success",
               content: "Data created Successfully",
               color: "#739E73",
               iconSmall: "fa fa-check",
               timeout: 5000
           });

          
         
       }
    );
    }
   this.ngOnInit()
  }
  getLocations(){
       this.dataService.getLocation().subscribe(
       data => {
          this.locationData=data.data;
        
       }
    );
  }
  syncData(name:any){
       this.dataService.sync(name).subscribe(
       data => {
          console.log("sync worked"); 
           this.notificationService.smallBox({
      title: "Success",
      content: "Data has been synced Successfully !",
      color: "#739E73",
      iconSmall: "fa fa-check",
      timeout: 5000
    });
       }
    );
  }

   testData(name:any){
       this.dataService.test(name).subscribe(
       data => {
          console.log("test worked"); 
           this.notificationService.smallBox({
      title: "Success",
      content: "Connect Successfully",
      color: "#739E73",
      iconSmall: "fa fa-check",
      timeout: 5000
    });
       }
    );
  }

onChange()
{
  this.information.driver=this.information.db;
}


  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  get(row){
    console.log(row)
  }
  edit(row){
     console.log(row)
    this.information.db=row.db; 
    this.information.driver=row.driver;
    this.information.host=row.host;
    this.information.name=row.name;
    this.information.password=row.password;
    this.information.port=row.port;
    this.information.url=row.url; 
    this.information.type=row.type;
    this.information.user=row.user;
    this.information.description=row.description;
    this.information.properties=row.properties;
    this.information.id=row.id;
    this.information.created=row.created;
    this.information.member=row.member;
    this.information.modified=row.modified;
    this.information.status=row.status;
    
     

  }
  delete(row){
      console.log(row)
      this.confirmationService.confirm({
            message: 'Are you sure that you want to Delete?',
            header: 'Confirmation',
            icon: 'fa fa-question-circle',
            accept: () => {
                console.log("deleted")
            this.dataService.deleteLocation({'id':row.id}).subscribe(data => { 
               this.notificationService.smallBox({
               title: "Success",
               content: "Data has been deleted Successfully !",
               color: "#739E73",
               iconSmall: "fa fa-check",
               timeout: 5000
            });
            this.ngOnInit();
           }
          );
            },
            reject: () => {
                console.log("rejected")
            }
        });

}
}