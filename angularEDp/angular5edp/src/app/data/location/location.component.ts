import { Component, OnInit ,ViewEncapsulation,ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import { DataService } from '../data.service';
import { JsonApiService } from "app/core/api/json-api.service";
import {ModalDirective} from "ngx-bootstrap";
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-loction',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css','../../smart-admin.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  
})
export class LocationComponent implements OnInit {
  
  rows: any[] = [];
  temp:any[]=[];
  driver:string[];
  controls={filter:''}
  public information={dburl:'',driver:'',name:''}
  constructor(private jsonApiService:JsonApiService,private httpService: HttpClient) { }
   @ViewChild('myTable') table: any;
   @ViewChild('staticModal') public staticModal:ModalDirective;
  ngOnInit() {
    this.jsonApiService.fetch('/tables/datatables.filters.json').subscribe(data=> {
      this.rows = data;
      this.temp=data;
      console.log(data)
    })
    this.httpService.get('./assets/dbDriver.json').subscribe(
      data => {
        console.log(data);
        this.driver = data;	 // FILL THE ARRAY WITH DATA.
          console.log(this.driver);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );

  
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
  }

onChange(newval)
{
  console.log(newval);
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
  }
  delete(row){
     console.log(row)
  }
}