import { Component, OnInit, TemplateRef } from '@angular/core';
import {Router} from "@angular/router";
import { DataService } from '../data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  providers: [DataService]
  
})
export class ExploreComponent implements OnInit {
 

  bsModalRef: BsModalRef;
  public termsAgreed = false
  
  constructor(private router: Router,private modalService: BsModalService,private dataService: DataService) {}
 
   ngOnInit() {}

  



}
