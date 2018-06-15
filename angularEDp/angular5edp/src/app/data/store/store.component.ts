import { Component, OnInit, ViewEncapsulation , ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from '../data.service';
import {ModalDirective} from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import {fadeInTop} from '../shared/animations/router.animations';
import { query } from '@angular/core/src/render3/instructions';
import {NotificationService} from '../../shared/utils/notification.service';
import { Location } from '@angular/common';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
interface UserResponse {
  message: string;
  result: any;
}
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css', '../../smart-admin.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DataService, ConfirmationService]

})
export class StoreComponent implements OnInit {
  locationData: any[] = [];
  storeData: any[] = [];
  storeProperties: any[] = [];
  storeFields: any[] = [];
   temp: any[] = [];
   temp2: any[] = [];
   temp3: any[] = [];
   dbAdd: boolean = false;
   kafka: boolean = false;
   api: boolean = false;
   ftp: boolean = false;
  file: boolean = false;
  elasticsearch: boolean = false;
  solr: boolean = false;
  hdfs:boolean = false;
  hbase:boolean = false;
  mongo: boolean = false;
  salesforce : boolean = false;
  geode: boolean = false;
  s3 : boolean = false;
  fileInfo : boolean = false;
  redis: boolean = false;
  handelResponse: boolean = false;
  handelResponseStore: boolean = false;
  handelResponseFields: boolean = false;
  dataFormat: any = [];
  source: any[];
  target: any[];
  targetData: any[];
  public selectedTags: any;
  controls = {filter: '', stores: '', fields: ''}

 // tslint:disable-next-line:max-line-length
 public information = {url: '', id: '', type: '', status: '', tags: '', driver: '', user: '', db: '', member: '', modified: '', name: '', description: '', host: '', password: '', port: '', created: '', properties: {check_query: '', callback: '', reference_url: '', token: '', token_sec: '', zookeeper: ''}, folder: '', bucket: '', access_key: '', schema: '', secret_key: ''}
  // tslint:disable-next-line:max-line-length
  public storeinformation = {tags: '', properties: {colNumber: '', name: '', ruleText: '', type: '', rowNumber: '', value: ''}, id: '', name: '', version: '', type: '', format: '', description: '', created: '', modified: '', delimeter: '', member: '', headerDelimeter: '', headerRow: '', skipTopRows: '', fileName: '', schema: '', table: '', folder: '', fileContent: '', fileContentType: '', fileContentLength: '', dataLocationId: '', container: '', actualName: '', query: {query: {fields: {type: '', category: '', as: '', order: '', schema: '', name: '', table: ''}, filters: '', join: ''}, storeId: '', locationId: ''}}
  // tslint:disable-next-line:max-line-length
 // public info = {tags: '', properties: '' , id: '', dataStoreId: '', dataStoreVersion: '', name: '', position: '', dataType: '', length: '', isMandatory: true, isPiiData: false, isPhiData: false, isPciData: false, isConfidential: false, format: '', precision: '', description: '', niceName: '', fieldSpec: '', derivedDataType: '', fieldType: ''}

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private dataService: DataService, private httpService: HttpClient, private notificationService: NotificationService, private confirmationService: ConfirmationService) { }
  // tslint:disable-next-line:member-ordering
  @ViewChild('myTable') table: any;
  // tslint:disable-next-line:member-ordering
  @ViewChild('staticModal') public staticModal: ModalDirective;
  ngOnInit() {

    this.httpService.get('./assets/dataFormat.json').subscribe(
      data => {
     this.dataFormat = data;	 // FILL THE ARRAY WITH DATA.
    },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    this.source = [{key: 'test'}, {key: 'example'}, {key: 'db'}, {key: 'important'}];
    this.target = [{key: ''}];
    this.getLocations();

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp1 = this.temp.filter(function(d) {
      return !val || ['name'].some((field: any) => {
        return (d[field].indexOf(val)) !== -1
      })
    });
    // update the rows
    this.locationData = temp1;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateFilterStore(event) {
    const val = event.target.value.toLowerCase();
 // filter our data
    const temp2 = this.temp2.filter(function(d) {
      return !val || ['name'].some((field: any) => {
        return (d[field].indexOf(val)) !== -1
      })
    });
    // update the rows
   this.storeData = temp2;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateFilterFields(event) {
    const val = event.target.value.toLowerCase();
 // filter our data
    const temp3 = this.temp3.filter(function(d) {
      return !val || ['name'].some((field: any) => {
        return (d[field].indexOf(val)) !== -1
      })
    });
    // update the rows
   this.storeFields = temp3;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  getLocations() {
    this.handelResponse = true;
    this.dataService.getLocation().subscribe(
    data => {
       this.locationData = data.data;
       this.temp = data.data;
       this.handelResponse = false
       console.log('location data', this.locationData);

    }
 );
}

getStore(storeInfo) {
  this.handelResponseStore = true
  this.dataService.getStore(storeInfo).subscribe(
  data => {
    console.log('in data store')
     this.storeData = data.data;
     this.temp2 = data.data;
     this.handelResponseStore = false;
     console.log('store data', this.storeData);

  }
);
}
getProperties(propertiesInfo) {
  this.dataService.getProperties(propertiesInfo).subscribe(
    data => {
      console.log('in data properties')
       this.storeProperties = data.data;
      // this.temp3 = data.data;
       console.log('storeProperties' , this.storeProperties)
    }
  );
}

getProp(propertiesInfo) {
  console.log('type', propertiesInfo.type)
if (propertiesInfo.type === 'STREAM') {
  this.kafka = true;
  this.api = false;
}
if (propertiesInfo.type === 'API') {
  this.kafka = false;
  this.api = true;
}
if (propertiesInfo.type === 'DB') {

  this.api = false;
   this.kafka = false;
  }
if (propertiesInfo.type === 'FTP' ) {
  this.api = false;
  this.kafka = false;

}
if (propertiesInfo.type === 'FILE') {

  this.api = false;
  this.kafka = false;
}
if (propertiesInfo.type === 'SFTP') {
  this.api = false;
  this.kafka = false; }

if (propertiesInfo.type === 'S3') {

  this.api = false;
  this.kafka = false;
}

if (propertiesInfo.type === 'ELASTIC SEARCH') {

  this.api = false;
 this.kafka = false;
}
 if (propertiesInfo.type === 'SOLR') {

  this.api = false;
  this.kafka = false;
}
 if (propertiesInfo.type === 'HDFS') {
  this.api = false;
  this.kafka = false;

}

}
getFields(fieldsInfo) {
  this.handelResponseFields = true;
   this.dataService.getFields(fieldsInfo).subscribe(
  data => {
    console.log('in data fields')
     this.storeFields = data.data;
     this.temp3 = data.data;
     this.handelResponseFields = false;
     console.log('storeFields' , this.storeFields)
  }
);
}



locationFormChange(type: any) {
  console.log(type)
  switch (type) {
    case 'TABLE':
    this.fileInfo = false;
    break;
    case 'FILE':
      this.fileInfo = true;
      break;
    case 'QUERY':
    this.fileInfo = false;
    break;
    case 'UNION':
    this.fileInfo = false;
    break;
    case 'TRANSPOSE':
    this.fileInfo = false;
    break;
    case 'QUERY':
      this.fileInfo = true;
      break;
    case 'SUMMARY':
    this.fileInfo = false;
    break;
    case 'TOPIC':
    this.fileInfo = false;
    break;
    default:
    console.log('in default');
  }
}



save(storeInfo) {
     if (storeInfo.id) {
       console.log('update api')
       storeInfo.properties = JSON.stringify(storeInfo.properties)
       storeInfo.query = JSON.stringify(storeInfo.query)
       this.dataService.updateStore(storeInfo).subscribe(
     data => {
           this.ngOnInit();
            this.notificationService.smallBox({
             title: 'Success',
             content: 'Data has been updated Successfully',
             color: '#739E73',
             iconSmall: 'fa fa-check',
             timeout: 5000
            });
         }
  );
     } else {
      storeInfo.properties = JSON.stringify(storeInfo.properties)
      storeInfo.query = JSON.stringify(storeInfo.query)
     console.log('create api')
     console.log(storeInfo)
     this.dataService.addStore(storeInfo).subscribe(
     data => {
             this.ngOnInit();
            this.notificationService.smallBox({
             title: 'Success',
             content: 'Data created Successfully',
             color: '#739E73',
             iconSmall: 'fa fa-check',
             timeout: 5000
         });
     }
  );
  }
 this.ngOnInit()
}




deleteStore(row) {
    console.log(row.id)
    this.confirmationService.confirm({
          message: 'Are you sure that you want to Delete?',
          header: 'Confirmation',
          icon: 'fa fa-question-circle',
          accept: () => {
              console.log('deleted store')
              alert(row.id)
          this.dataService.deleteStore(row).subscribe(data => {
             this.notificationService.smallBox({
             title: 'Success',
             content: 'Data has been deleted Successfully !',
             color: '#739E73',
             iconSmall: 'fa fa-check',
             timeout: 5000
          });
          this.ngOnInit();
         }
        );
          },
          reject: () => {
          }
      });

  }
  editstore(row) {
      this.bindValues(row)
      this.storeinformation.tags = row.tags;
   }

   clone(cloneInfo) {
  this.bindValues(cloneInfo)
  }

 cloneStore(cloneInfo) {
   this.dataService.cloneStore(cloneInfo).subscribe(
     data => {
            // this.ngOnInit();
            this.notificationService.smallBox({
             title: 'Success',
             content: 'Data cloned Successfully',
             color: '#739E73',
             iconSmall: 'fa fa-check',
             timeout: 5000
         });
         }
    );
 }

    bindValues(row: any) {
      console.log('id', row.id)
      var propertiesValues = {colNumber: '', name: '', ruleText: '', type: '', rowNumber: '', value: ''}
   // tslint:disable-next-line:max-line-length
      var queryValues =  {query: {fields: {type: '', category: '', as: '', order: '', schema: '', name: '', table: ''}, filters: '', join: ''}, storeId: '', locationId: ''}
      propertiesValues = JSON.parse(row.properties)
      queryValues = JSON.parse(row.query)
      this.storeinformation.name = row.name;
      this.storeinformation.version = row.version;
      this.storeinformation.format = row.format;
      this.storeinformation.type = row.type;
      this.storeinformation.description = row.description;
      this.storeinformation.id = row.id;
      this.storeinformation.created = row.created
      this.storeinformation.dataLocationId = row.dataLocationId
      this.storeinformation.properties = propertiesValues;
      this.storeinformation.query = queryValues;
    }

    clearObject() {
      // tslint:disable-next-line:max-line-length
     this.storeinformation = {tags: '', properties: {colNumber: '', name: '', ruleText: '', type: '', rowNumber: '', value: ''}, id: '', name: '', version: '', type: '', format: '', description: '', created: '', modified: '', delimeter: '', member: '', headerDelimeter: '', headerRow: '', skipTopRows: '', fileName: '', schema: '', table: '', folder: '', fileContent: '', fileContentType: '', fileContentLength: '', dataLocationId: '', container: '', actualName: '', query: {query: {fields: {type: '', category: '', as: '', order: '', schema: '', name: '', table: ''}, filters: '', join: ''}, storeId: '', locationId: ''}}

     }


     updateTags() {
      for (let keys = 0; keys < this.target.length; keys++) {
           if (keys != 0) {
           this.selectedTags += this.target[keys].key + ',';
           }
        }
       this.getSeletecdData(this.storeinformation);
       this.selectedTags = this.selectedTags.slice(0, -1);
       this.selectedTags = this.selectedTags.replace(/undefined/g, '')
       this.storeinformation.tags = this.selectedTags;
       console.log('updatetag', this.storeinformation);
       console.log(this.storeinformation.tags)
       this.addEdittag(this.storeinformation);
       this.selectedTags = '';
     }

     getSeletecdData(row: any) {
      try {
     console.log('row tags', row.tags);
       this.targetData = row.tags.split(',');
       let prepareJson = [];
       this.targetData.forEach(element => {
         let data = {key: element};
         prepareJson.push(data);
   });
      this.target = prepareJson;
     this.bindValues(row)


     } catch (error) {
       console.error(error);

       }

   }
   addEdittag(Tagsdata: any) {
    console.log(Tagsdata)
    Tagsdata.properties = JSON.stringify(Tagsdata.properties)
    this.dataService.updateStore(Tagsdata).subscribe(
      data => {
        this.ngOnInit();
             this.notificationService.smallBox({
              title: 'Success',
              content: 'Tags has been updated Successfully',
              color: '#739E73',
              iconSmall: 'fa fa-check',
              timeout: 5000
          });
      }
   )
  }
}
