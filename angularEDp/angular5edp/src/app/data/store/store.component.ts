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
  fields: any;
  store: any;
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
  hdfs: boolean = false;
  hbase: boolean = false;
  mongo: boolean = false;
  salesforce : boolean = false;
  geode: boolean = false;
  s3 : boolean = false;
  fileInfo : boolean = false;
  redis: boolean = false;
  handelResponse: boolean = false;
  handelResponseStore: boolean = false;
  handelResponseFields: boolean = false;
  string: boolean = false;
  character: boolean = false;
  integer: boolean = false;
  date: boolean = false;
  double: boolean = false;
  dataFormat: any ;
  source: any[];
  target: any[];
  targetData: any[];
   selectedTags: any;
   selectedFieldTag: any
  controls = {filter: '', stores: '', fields: ''}

 
 public information: any = {}
 public storeinformation:any = {properties: {}}
 public storeFieldsInfo: any = {}

  constructor(private router: Router, private dataService: DataService, private httpService: HttpClient, 
    private notificationService: NotificationService, private confirmationService: ConfirmationService) { }
  // tslint:disable-next-line:member-ordering
  @ViewChild('myTable') table: any;
  // tslint:disable-next-line:member-ordering
  @ViewChild('staticModal') public staticModal: ModalDirective;
  ngOnInit() {
    this.source = [{key: 'test'}, {key: 'example'}, {key: 'db'}, {key: 'important'}];
    this.target = [{key: ''}];
    this.getLocations();
console.log(this.selectedTags)
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
// ####################################### STORE TABLE FUNCTIONALITY #####################################
getStore(storeInfo) {
  this.handelResponseStore = true
  this.dataService.getStore(storeInfo).subscribe(
  data => {
    console.log('in data store')
     this.storeData = data.data;
     this.temp2 = data.data;
     this.store = data;
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

  // tslint:disable-next-line:max-line-length
  var queryValues = {query: {query: {fields: [{type: '', category: '', as: '', order: '', tableAs: '', schema: null, name: '', table: null}], filters: [], union: []}, storeId: '', locationId: ''}}
  queryValues = JSON.parse(fieldsInfo.query)
  this.handelResponseFields = true;
   this.dataService.getFields(fieldsInfo).subscribe(
  data => {
    console.log('in data fields')
     this.storeFields = data.data;
     this.temp3 = data.data;
     this.fields = data;
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



saveStore(storeInfo) {
  console.log('store info', storeInfo)
     if (storeInfo.id) {
       console.log('update api')
       storeInfo.dataLocationId = this.store.data[0].dataLocationId;
       storeInfo.properties = JSON.stringify(storeInfo.properties)
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
      storeInfo.dataLocationId = this.store.data[0].dataLocationId;
      storeInfo.properties = JSON.stringify(storeInfo.properties)
      storeInfo.query = JSON.stringify(storeInfo.query)
      console.log('create api')
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
    this.bindStore(row)
    // this.storeinformation.tags = row.tags;
  }

  cloneStoreBind(cloneInfo) {
  this.bindStore(cloneInfo)
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

    bindStore(row) {
      console.log('id', row.id)
      // tslint:disable-next-line:max-line-length
      var propertiesValues = {}
      propertiesValues = JSON.parse(row.properties)
      this.storeinformation.name = row.name;
      this.storeinformation.version = row.version;
      this.storeinformation.format = row.format;
      this.storeinformation.type = row.type;
      this.storeinformation.description = row.description;
      this.storeinformation.id = row.id;
     this.storeinformation.dataLocationId = row.dataLocationId
     this.storeinformation.created = row.created
     this.storeinformation.actualName = row.actualName
     this.storeinformation.tags = row.tags
     this.storeinformation.query = row.query
     this.storeinformation.properties = propertiesValues;
 }

 updateTags() {
   console.log('update tag call')
  for (let keys = 0; keys < this.target.length; keys++) {
       if (keys !== 0) {
       this.selectedTags += this.target[keys].key + ',';
       }
    }

   //this.getSelectedTags(this.storeinformation);
   this.selectedTags = this.selectedTags.slice(0, -1);
   this.selectedTags = this.selectedTags.replace(/undefined/g, '')
   this.storeinformation.tags = this.selectedTags;
   console.log('updatetag', this.storeinformation);
   console.log(this.storeinformation.tags)
   this.addEdittag(this.storeinformation);
   this.selectedTags = '';
 }
 getSelectedTags(row) {
    try {
      console.log('getselect tag call')
   console.log('row tags', row.tags);
     this.targetData = row.tags.split(',');
     let prepareJson = [];
     this.targetData.forEach(element => {
       let data = {key: element};
       prepareJson.push(data);
 });
    this.target = prepareJson;
   this.bindStore(row)
   } catch (error) {
     console.error(error);
     }
 }

 addEdittag(Tagsdata: any) {
   console.log('when tag data add',Tagsdata)
   Tagsdata.dataLocationId = this.store.data[0].dataLocationId;
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
  this.ngOnInit();
 }
getFormat() {
  this.dataService.getDataFormat().subscribe(
    data => {
      console.log(data)
    this.dataFormat = data;
      console.log(this.dataFormat)
    }
 );

}

// ####################################### END STORE TABLE FUNCTIONALITY #####################################


// ####################################### FIELDS TABLE FUNCTIONALITY #####################################

dataTypeChanged(row: any) {

  switch (row.dataType) {
    case 'CHAR':
    this.double = false;
    this.date = false;
    break;
    case 'INTEGER':
    this.double = false;
    this.date = false;
      break;
    case 'DATE':
    this.date = true;
    this.double = false;
    break;
    case 'DOUBLE':
    this.double = true;
    this.date = false;
    break;
    case 'STRING':
    this.double = false;
    this.date = false;
    break;
    default:
    console.log('in default');
  }

}
getRowFields(row: any) {
console.log('storefields', row);
this.bindFields(row)
}

bindFields(rows) {
this.storeFieldsInfo.tags = rows.tags;
this.storeFieldsInfo.properties = rows.properties;
this.storeFieldsInfo.id = rows.id;
this.storeFieldsInfo.name = rows.name;
this.storeFieldsInfo.position = rows.position;
this.storeFieldsInfo.dataType = rows.dataType;
this.storeFieldsInfo.length = rows.length;
this.storeFieldsInfo.isConfidential = rows.isConfidential;
this.storeFieldsInfo.isMandatory = rows.isMandatory;
this.storeFieldsInfo.isPciData = rows.isPciData;
this.storeFieldsInfo.isPhiData = rows.isPhiData;
this.storeFieldsInfo.isPiiData = rows.isPiiData;
this.storeFieldsInfo.format = rows.format;
this.storeFieldsInfo.description = rows.description;
this.storeFieldsInfo.precision = rows.precision;
this.storeFieldsInfo.dataStoreVersion = rows.dataStoreVersion

}

saveFields(storeInfo) {
  if (storeInfo.id) {
   storeInfo.dataStoreId = this.fields.data[0].dataStoreId;
    this.dataService.updateField(storeInfo).subscribe(
      data => {
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
 storeInfo.dataStoreId = this.fields.data[0].dataStoreId;
  this.dataService.addFields(storeInfo).subscribe(
    data => {
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
}



editFields(row) {
this.bindFields(row)

}


deleteFields(rows) {
   this.confirmationService.confirm({
    message: 'Are you sure that you want to Delete?',
    header: 'Confirmation',
    icon: 'fa fa-question-circle',
    accept: () => {
        alert('deleted fields')
    this.dataService.deletefield(rows).subscribe(data => {
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

addFieldTag() {
  console.log('update tag call')
  for (let keys = 0; keys < this.target.length; keys++) {
       if (keys !== 0) {
       this.selectedFieldTag += this.target[keys].key + ',';
       }
    }
   //this.getSelectedTags(this.storeinformation);
   this.selectedFieldTag = this.selectedFieldTag.slice(0, -1);
   this.selectedFieldTag = this.selectedFieldTag.replace(/undefined/g, '')
   this.storeFieldsInfo.tags = this.selectedFieldTag;
   console.log('updatetag', this.storeFieldsInfo);
   console.log(this.storeFieldsInfo.tags)
   this.addEditFieldTag(this.storeFieldsInfo);
   this.selectedFieldTag = '';
}
addEditFieldTag(dataField: any) {
  console.log('when tag data add', dataField)
  dataField.dataStoreId = this.fields.data[0].dataStoreId;
  dataField.properties = JSON.stringify(dataField.properties)
  this.dataService.updateField(dataField).subscribe(
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
 this.ngOnInit();
}

cloneFieldBind(row) {
  this.bindFields(row)
}

cloneFields(row) {
  this.dataService.cloneField(row).subscribe(
    data => {
            this.ngOnInit();
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


clearObject() {
  // tslint:disable-next-line:max-line-length
  this. storeinformation = { properties: {}}
  // tslint:disable-next-line:max-line-length
  this. storeFieldsInfo = {}
 }

}
