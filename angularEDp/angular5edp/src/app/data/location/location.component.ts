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
  dbAdd:boolean=false;
  dbCheck:boolean=false;
  apiCheck:boolean=false;
  kafkaCheck:boolean=false;
  solrCheck:boolean=false;
  s3:boolean=false;
  ftp:boolean=false;
  file:boolean=false;
  api:boolean=false;
  kafka:boolean=false;
  elasticsearch:boolean=false;
  solr:boolean=false;
  hdfs:boolean=false;
  hbase:boolean=false;
  mongo:boolean=false;
  salesforce:boolean=false;
  geode:boolean=false;
  redis:boolean=false;

  driverData:any=[];
  locationData:any[] = [];
  controls={filter:''}
  public information={url:'',id:'',type:'',status:'',driver:'',user:'',db:'',member:'',modified:'',name:'',description:'',host:'',password:'',port:'',created:'',properties:'',folder:'',bucket:'',access_key:'', schema:'',secret_key:''}
  constructor(private jsonApiService:JsonApiService,private httpService: HttpClient,public dataService:DataService,private notificationService: NotificationService,private confirmationService: ConfirmationService) { }
   @ViewChild('myTable') table: any;
   @ViewChild('staticModal') public staticModal:ModalDirective;
  ngOnInit() {
    this.dbAdd=true;
    this.dbCheck=true;
    this.ftp=false;
    this.file=false;
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
      return !val || ['name'].some((field: any)=>{
        return (d[field].indexOf(val)) !== -1
      }) 
    });

    // update the rows
    this.locationData = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  save(locationinfo){
    console.log(locationinfo);
       if(locationinfo.id){
         console.log("update api")
         this.dataService.updateLocation(locationinfo).subscribe(
       data => {
             
              this.ngOnInit();
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
               this.ngOnInit();
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
          this.temp=data.data;
          console.log(this.locationData);
        
       }
    );
  }
  syncData(name:any){
       this.dataService.sync(name).subscribe(
       data => {
           console.log("sync worked"); 
           this.ngOnInit();
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
           this.ngOnInit();
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

getRowData(row:any){
  console.log(row);
  console.log(row.type );
  console.log(row.properties);
  console.log(row.id);
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
  

  if(row.type=='TABLE'){
    this.dbCheck=true;
    this.apiCheck=false;
    this.kafkaCheck=false;
    this.solrCheck=false;
   
   
  }
  if(row.type=='DB'){
    this.dbCheck=true;
    this.apiCheck=false;
    this.kafkaCheck=false;
    this.solrCheck=false;

  }
  if(row.type=='FILE'){
    this.dbCheck=false;
    this.apiCheck=false;
    this.kafkaCheck=false;
    this.solrCheck=false;
  }
  if(row.type=='HDFS'){
    this.dbCheck=false;
    this.apiCheck=false;
    this.kafkaCheck=false;
    this.solrCheck=false;
  }
  if(row.type=='FTP'){
    this.dbCheck=false;
    this.apiCheck=false;
    this.kafkaCheck=false;
    this.solrCheck=false;
  }
  if(row.type=='HBASE'){
    this.dbCheck=false;
    this.apiCheck=false;
    this.kafkaCheck=false;
    this.solrCheck=false;
  }
  if(row.type=='S3'){
    this.dbCheck=false;
    this.apiCheck=false;
    this.kafkaCheck=false;
    this.solrCheck=false;
  }
  if(row.type=='SFTP'){
    this.dbCheck=false;
    this.apiCheck=false;
    this.kafkaCheck=false;
    this.solrCheck=false;
  }
  if(row.type=='API'){
    this.apiCheck=true;
    this.dbCheck=false;
    this.kafkaCheck=false;
    this.solrCheck=false;
  }
  if(row.type=='STREAM'){
    this.kafkaCheck=true;
    this.apiCheck=false;
    this.dbCheck=false;
    this.solrCheck=false;
  }
  if(row.type=='SOLR'){
    this.kafkaCheck=true;
    this.apiCheck=false;
    this.dbCheck=false;
    this.solrCheck=false;
  }
  if(row.type=='ELASTIC SEARCH'){
    this.kafkaCheck=true;
    this.apiCheck=false;
    this.dbCheck=false;
    this.solrCheck=false;
  }
}

onChange()
{
  this.information.driver=this.information.db;
}

locationFormChange(type:any){
 console.log(type)
  if(type=='DB'){
    this.dbAdd=true;
    this.ftp=false;
    this.file=false;
    this.api=false;
    this.s3=false;
    this.kafka=false;
    this.elasticsearch=false
  }
  if(type=='FTP' ){
    this.dbAdd=false;
    this.ftp=true;
    this.file=false;
    this.api=false;
    this.s3=false;
    this.kafka=false;
    this.elasticsearch=false
  }
  if(type=='FILE'){
    this.file=true;
    this.dbAdd=false;
    this.ftp=false;
    this.api=false;
    this.s3=false;
    this.kafka=false;
    this.elasticsearch=false
  }
  if(type=='SFTP'){
    this.dbAdd=false;
    this.ftp=true;
    this.file=false;
    this.api=false;
    this.s3=false;
    this.kafka=false;
    this.elasticsearch=false
  }
  if(type=='API'){
    this.api=true;
    this.file=false;
    this.dbAdd=false;
    this.ftp=false;
    this.s3=false;
    this.kafka=false;
    this.elasticsearch=false
  }
  if(type=='S3'){
    this.s3=true;
    this.api=false;
    this.file=false;
    this.dbAdd=false;
    this.ftp=false;
    this.kafka=false;
    this.elasticsearch=false
   
  }
  if(type=='KAFKA'){
    this.kafka=true;
    this.s3=false;
    this.api=false;
    this.file=false;
    this.dbAdd=false;
    this.ftp=false;
    this.elasticsearch=false;
   
  }
  if(type=='ELASTIC SEARCH'){
    this.file=false;
    this.dbAdd=false;
    this.ftp=false;
    this.api=false;
    this.s3=false;
    this.kafka=false;
    this.elasticsearch=true;
   
  }
   if(type=='SOLR'){
    this.file=false;
    this.dbAdd=false;
    this.ftp=false;
    this.api=false;
    this.s3=false;
    this.kafka=false;
    this.elasticsearch=false;
    this.solr=true;
   
  }
   if(type=='HDFS'){
     this.file=false;
    this.dbAdd=false;
    this.ftp=false;
    this.api=false;
    this.s3=false;
    this.kafka=false;
    this.elasticsearch=false;
    this.solr=false;
    this.hdfs=true;
   
  }

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