import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {NotificationService} from '../../shared/utils/notification.service';
import { directiveDef } from '@angular/core/src/view/provider';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css', '../../smart-admin.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [UserService, ConfirmationService]

})
export class DirectoryComponent implements OnInit {
  controls = {user: '', group: '', role: '', directory: ''};
  directories: any[] =[];
  tempDirectory: any[] =[];
  usersDirectories: any[] = [];
  tempUsersDirectories: any[] = [];
  groupDirectories: any[] = [];
  tempGroupDirectories: any[] = [];
  users: any = [];
  groups: any = [];
  rules: any = [];
  showMappingTab = false; 
  responseTab = false;
  public directory : any =  {};
  public  newRule : any = {condition:{}};
  syncTypeData =[
    { key:'ONE TIME',value:'ONE TIME'},
    { key:'SCHEDULE',value:'SCHEDULE'},
    { key:'REAL TIME',value:'REAL TIME'}]

userMappingData = [{name:'Name', value: ''},
{name:'User Name',value: ''}, 
{name:'Email',value: ''},
{name:'Join Date',value: ''},
{name:'Client' ,value: ''},
{name:'Business Unit',value: ''},
{name:'Phone', value: ''},
{name:'Role',value: ''},
{name:'Address',value: ''},
{name:'City',value: ''},
{name:'State',value: ''},
{name:'Region',value: ''},
{name:'Country',value: ''},
{name:'Zip', value: ''}]

GroupMappingData = [{
  name:'Created Date',value: ''},
  {name:'Name',value: ''},
  {name:'Code',value: ''},
  {name:'Description',value: ''}]




  constructor(private router: Router,
    private modalService: BsModalService, private userService: UserService, 
    private notificationService: NotificationService, private confirmationService: ConfirmationService) { }
  // tslint:disable-next-line:member-ordering
  @ViewChild('myTable') table: any;

  ngOnInit() {
    this.getDirectory();
    this.getUser();
    this.getGroup(); 
  }

  //  ######################## NOTIFICATION FUNCTIONALITY STARTS #############################

  saveNotification() {
    this.notificationService.smallBox({
      title: 'Success',
      content: 'saved Successfully',
      color: '#739E73',
      iconSmall: 'fa fa-check',
      timeout: 5000
  });
  }
  syncNotification() {
    this.notificationService.smallBox({
      title: 'Success',
      content: 'Synced data Successfully',
      color: '#739E73',
      iconSmall: 'fa fa-check',
      timeout: 5000
  });
  }
  updateNotification() {
    this.notificationService.smallBox({
      title: 'Success',
      content: 'Updated Successfully',
      color: '#739E73',
      iconSmall: 'fa fa-check',
      timeout: 5000
  });
  }
  deleteNotification() {
    this.notificationService.smallBox({
      title: 'Success',
      content: 'Data has been deleted Successfully !',
      color: '#739E73',
      iconSmall: 'fa fa-check',
      timeout: 5000
   });
  }
  // #################################################################################

  // ######################## DIRECTORY FUNCTIONALITY SATRTS ##########################

  getDirectory() {
    this.userService.getDirectory().subscribe(
      data => {
        this.directories = data;
        this.tempDirectory = data;
        console.log(this.directories)
        }
      );
    }
    getUser() {
      this.userService.getUsers().subscribe(
        data => {
          this.usersDirectories = data.data;
          this.tempUsersDirectories = data.data;
          console.log('usersDirectories:',this.usersDirectories)
          }
        );
      }
      getGroup() {
        this.userService.getUserGroups().subscribe(
          data => {
            this.groupDirectories = data.data;
            this.tempGroupDirectories = data.data;
            console.log('groupDirectories:',this.groupDirectories)
            }
          );
        }

        getRowData(row) {
          this.getUserDirectory(row);
          this.getGroupDirectory(row);
          this.getRuleDirectory(row); 
          this.bindDirectory(row)
         
         }

         getUserDirectory(row) {
          this.responseTab=true; 
        
            this.userService.getUserDirectory(row).subscribe(data=> {
                this.users = data;
               // this.bindUserMapping(this.users) 
                
            });
         }
        //  bindUserMapping(row) { 
        //   this.userMappingData=row;
        //   console.log("mapped data",this.userMappingData)
        //  }

         getGroupDirectory(row) {
          this.responseTab=true;
            this.userService.getGroupDiretory(row).subscribe(data=> {
              this.groups = data;
            
            });
         }

         getRuleDirectory(row) {
          this.responseTab=true;
          this.userService.getRuleDirectory(row).subscribe(data=> {
            this.rules = data

          });
         }

         editDiretcory(directoryInfo) {
           this.bindDirectory(directoryInfo);
           this.directory.groupMapping =directoryInfo.groupMapping     
           this.directory.userMapping=directoryInfo.userMapping
         }
         bindDirectory(directoryInfo) {
          this.directory.name = directoryInfo.name;
          this.directory.category = directoryInfo.category;
          this.directory.description =directoryInfo.description;
          this.directory.host = directoryInfo.host;
          this.directory.baseDn = directoryInfo.baseDn;
          this.directory.status = directoryInfo.status;
          this.directory.created = directoryInfo.created;
          this.directory.id = directoryInfo.id;
          this.directory.cron = directoryInfo.cron;
          this.directory.port = directoryInfo.port;
          this.directory.businessUnit = directoryInfo.businessUnit;
          this.directory.properties = directoryInfo.properties;
          this.directory.rootDn = directoryInfo.rootDn;
          this.directory.rootPassword = directoryInfo.rootPassword
          this.directory.syncType = directoryInfo.syncType
          this.directory.type = directoryInfo.type
          this.directory.url = directoryInfo.url
           
        }

        saveDirectory(directoryInfo) {  
         if (directoryInfo.id) {
            this.userService.updateDirectory(directoryInfo).subscribe(
              data => {
                this.updateNotification();
                   this.ngOnInit();
              });

          } else {
            this.userService.createDirectory(directoryInfo).subscribe(
              data => {
                this.saveNotification();
                   this.ngOnInit();
              });
          }
   }

   deleteDirectory(row) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
          console.log('deleted')
      this.userService.deleteDirectory({'id': row.id}).subscribe(data => {
        this.deleteNotification();
      this.ngOnInit();
     }
    );
      },
      reject: () => {
          console.log('rejected')
      }
  });
}

syncDirectory(directoryInfo) {

  this.userService.syncDirectory(directoryInfo).subscribe(
    data => {
      this.syncNotification();
         this.ngOnInit();
    });
}

       clearDirectoryObject() {
         this.directory = {};
       } 


       saveUserMapping(mappingData) {
         const mappedData = JSON.stringify(mappingData)
          this.directory.userMapping = mappedData
          console.log(this.directory)
        this.userService.updateDirectory(this.directory).subscribe(
            data => {
              this.updateNotification();
                 this.ngOnInit();
            });
       }
       
       saveGroupMapping(mappingData) {
        const mappedData = JSON.stringify(mappingData)
        this.directory.groupMapping = mappedData
        console.log(this.directory)
      this.userService.updateDirectory(this.directory).subscribe(
          data => {
            this.updateNotification();
               this.ngOnInit();
          });
       }

      //   ################################### RULE FUNCTIONALITY STARTS #############################################
    

   

}
