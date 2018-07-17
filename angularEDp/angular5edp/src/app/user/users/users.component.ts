import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {NotificationService} from '../../shared/utils/notification.service';
import { userInfo } from 'os';

declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../../smart-admin.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [UserService, ConfirmationService]

})
export class UsersComponent implements OnInit {

  rows: any[] = [];
  users: any[] = [];
  groups: any[] = [];
  roles: any[] = [];
  members: any[] = [];
  tempUser: any[] = [];
  tempGroup: any[] = [];
  tempRole: any[] = [];
  tempMember: any[] = [];
  controls = {user: '', group: '', role: ''};
  state = {tabs: {demo3: 'hr1'}};
  enableMember = false;
  groupId : any;
  roleCodeId : any;
  bsModalRef: BsModalRef;
  public termsAgreed = false
  public user : any =  {};
  public group : any = {}; 
  public role : any = {}; 

  constructor(
    private router: Router,private modalService: BsModalService, private userService: UserService,
     private notificationService: NotificationService, private confirmationService: ConfirmationService) {}
    // tslint:disable-next-line:member-ordering
   @ViewChild('myTable') table: any;


   ngOnInit() {

    this.getUsers();
    this.getUserGroups();
    this.getUserRoles();
   }

   getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data.data;
        this.tempUser = data.data;
        }
      );
    }

    getUserGroups() {
      this.userService.getUserGroups().subscribe(
        data => {
          this.groups = data.data;
          this.tempGroup = data.data;
          }
        );
      }
  getUserRoles() {
        this.userService.getUserRoles().subscribe(
          data => {
            this.roles = data.data;
            this.tempRole = data.data;
            }
          );
        }
  
//  ######################## FILTER FUNCTIONALITY #############################

        updateFilterUser(event) {
          const val = event.target.value;
          // filter our data
             const temp = this.tempUser.filter(function(d) {
            return !val || ['firstName'].some((field: any) => {
              return (d[field].indexOf(val)) !== -1
            })
          });
          // update the rows
          this.users = temp;
          // Whenever the filter changes, always go back to the first page
          this.table.offset = 0;
        }
        updateFilterGroup(event) {
          const val = event.target.value;

          // filter our data

          const temp = this.tempGroup.filter(function(d) {
            return !val || ['name'].some((field: any) => {
              return (d[field].indexOf(val)) !== -1
            })
          });

          // update the rows
          this.groups = temp;
          // Whenever the filter changes, always go back to the first page
          this.table.offset = 0;
        }

        updateFilterRoles(event) {

          const val = event.target.value;
          // filter our data

          const temp = this.tempRole.filter(function(d) {
            return !val || ['code'].some((field: any) => {
              return (d[field].indexOf(val)) !== -1
            })
          });
          // update the rows
          this.roles = temp;
          // Whenever the filter changes, always go back to the first page
          this.table.offset = 0;
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
//  ####################### USER FUNCTIONALITY STARTS ##############################

          editUser(row) {
            this.bindUser(row);
          }

          bindUser(row) {
            console.log(row);
            this.user.firstName = row.firstName;
            this.user.lastName = row.lastName;
            this.user.roleCode = row.roleCode;
            this.user.email = row.email;
            this.user.status = row.status;
            this.user.creationDate = row.creationDate;
            this.user.id = row.id;
            this.user.username = row.username;
            this.user.address = row.address;
            this.user.businessUnit = row.businessUnit;
            this.user.client = row.client;
            this.user.cookie = row.cookie;
            this.user.password = row.password
            this.user.phoneNum = row.phoneNum;

          }
          selectedRoleCode(roleCode) {
             this.tempRole.forEach(element => {
           if(roleCode.roleCode === element.code ) {
                 this.roleCodeId =element.id
              }
             
            });

          }
       
     saveUser(userinformation) {
         userinformation.roleId = this.roleCodeId;
          
         if (userinformation.id) {
            this.userService.updateUser(userinformation).subscribe(
              data => {
                this.updateNotification();
                   this.ngOnInit();
              });

          } else {
            this.userService.createUser(userinformation).subscribe(
              data => {
                this.saveNotification();
                   this.ngOnInit();
              });
          }
   }

   deleteUser(row) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
          console.log('deleted')
      this.userService.deleteUser({'id': row.id}).subscribe(data => {
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
clearUserObject() {
  this.user = {}
}

   //  ####################### GROUP FUNCTIONALITY STARTS ##############################
   editGroup(row) {
    this.bindGroup(row);
  }
  bindGroup(row) {
    console.log(row);
    this.group.client = row.client;
    this.group.code = row.code;
    this.group.created = row.created;
    this.group.createdBy = row.createdBy;
    this.group.description = row.description;
    this.group.id = row.id;
    this.group.modified = row.modified;
    this.group.modifiedBy = row.modifiedBy;
    this.group.name = row.name;
    this.group.status = row.status;
  }

 saveGroup(groupInfo) {

    if (groupInfo.id) {
      this.userService.updateGroup(groupInfo).subscribe(
        data => {
          this.updateNotification();
             this.ngOnInit();
        });

    } else {
      this.userService.createGroup(groupInfo).subscribe(
        data => {
          this.saveNotification();
             this.ngOnInit();
        });
    }
}
deleteGroup(row) {
  this.confirmationService.confirm({
    message: 'Are you sure that you want to Delete?',
    header: 'Confirmation',
    icon: 'fa fa-question-circle',
    accept: () => {
        console.log('deleted')
    this.userService.deleteGroup({'id': row.id}).subscribe(data => {
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

   clearGroupObject() {
       this. group = {}
      }

  //  ####################### MEMBER FUNCTIONALITY STARTS ##############################

  getMemberData(row) {
   this.userService.getMembers(row).subscribe(
      data => {
        this.members = data.data;
        this.enableMember = true;
       console.log(this.members)
        }
      );
  }

  bindGroupId(row) {
  this.groupId = row.id;
  }

  saveMember(memberInfo) {
    this.userService.createMember(memberInfo,this.groupId).subscribe(
      data => {
        this.saveNotification();
        this.getMemberData(this.groupId);
          
      });

  }

  deleteMember(memberInfo) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
          console.log('deleted')
      this.userService.deleteMember(memberInfo,this.groupId).subscribe(data => {
        this.deleteNotification();
        this.getMemberData(this.groupId);
     }
    );
      },
      reject: () => {
          console.log('rejected')
      }
  });
  }

//  ####################### ROLE FUNCTIONALITY STARTS ##############################
 
saveRole(roleInfo) {
  if(roleInfo.id) {
    this.userService.updateRole(roleInfo).subscribe(
      data => {
        this.updateNotification();
          this.getUserRoles();
      });

  } else {
    this.userService.createRole(roleInfo).subscribe(
      data => {
        this.saveNotification();
        this.getUserRoles();
          
      });
  }
 
}
editRole(row) {
  this.bindRole(row);
}
bindRole(row) {
  console.log(row);
  this.role.code = row.code;
  this.role.description = row.description;
  this.role.id = row.id; 
  this.role.status = row.status;
}

deleteRole(roleInfo) {
  this.confirmationService.confirm({
    message: 'Are you sure that you want to Delete?',
    header: 'Confirmation',
    icon: 'fa fa-question-circle',
    accept: () => {
        console.log('deleted')
    this.userService.deleteRole({'id': roleInfo.id}).subscribe(data => {
      this.deleteNotification();
    this.getUserRoles();
   }
  );
    },
    reject: () => {
        console.log('rejected')
    }
});
}
clearRoleObject() {
  this. role = {}; 
}
}
