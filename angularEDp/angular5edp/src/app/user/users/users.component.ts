import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from '../user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {NotificationService} from '../../shared/utils/notification.service';

declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css','../../smart-admin.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [UserService, ConfirmationService]
  
})
export class UsersComponent implements OnInit {
 
  rows: any[] = [];
  users: any[] = [];
  groups: any[] = [];
  roles: any[] = [];

  controls = {filter: ''};
  state={tabs: {demo3: 'hr1'}};

  bsModalRef: BsModalRef;
  public termsAgreed = false
  
  constructor(
    private router: Router,  
    private modalService: BsModalService,private userService: UserService) {}
    
    

   ngOnInit() {

    this.getUsers();
    this.getUserGroups();
    this.getUserRoles();
   }

   getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data.data;
        }
      );
    }

    getUserGroups() {
      this.userService.getUserGroups().subscribe(
        data => {
          this.groups = data.data;
          }
        );
      }
    
      getUserRoles() {
        this.userService.getUserRoles().subscribe(
          data => {
            this.roles = data.data;
            }
          );
        }

}
