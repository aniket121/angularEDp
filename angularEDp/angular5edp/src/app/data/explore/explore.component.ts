import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, ElementRef } from '@angular/core';
import { Router} from '@angular/router';
import { DataService } from '../data.service';
import { DataNotesService } from '../notes.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { JsonApiService } from 'app/core/api/json-api.service';
import {ModalDirective} from 'ngx-bootstrap';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {NotificationService} from '../../shared/utils/notification.service';
import {DomSanitizer} from '@angular/platform-browser';
import 'pivottable/dist/pivot.min.js';
import 'pivottable/dist/pivot.min.css';
import * as d3 from 'd3';
import { concat } from 'rxjs/operators/concat';
import 'jquery-ui/ui/widgets/sortable';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css', '../../smart-admin.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DataService, DataNotesService, ConfirmationService]

})
export class ExploreComponent implements OnInit {
  temp: any[] = [];
  temp1: any[] = [];
  temp2: any[] = [];
  handelResponse = false;
  handelResponseStore = false;
  controls = {dataTab: '', location: '', store: ''};
  content = '';
  bsModalRef: BsModalRef;
  public termsAgreed = false
  dataLocations: any[] = [];
  profiles: any[] = [];
  properties: any[] = [];
  driverData: any = [];
  remoteStores: any[] = [];
  currentLocation = null;
  currentLocationRemoteStore = null;
  newDataLocation = {};
  importdata = [];
  newImportData = {};
  editproperty = false;
  selectedTargetLocation = '';
  newnotes = [];
  editnewnote = {};
  dataObjects = [];
  dataNotes = [];
  contentCategory = 'table';
  contentType = 'application/json';
  dataStoreNotes = [];
  notesLoading = false;
  showAce = false;
  showSubmit = false;
  buttonText = 'Ok';
  aceViewSession = undefined;
  refresh = false;
  dbCheck = false;
  ftpCheck = false;
  sftpCheck = false;
  s3Check = false;
  fileCheck = false;
  apiCheck = false;
    public information = { id: '', type: ''}
  chartdata = [
    {salesperson: 'Bob', sales: 33},
    {salesperson: 'Robin', sales: 12},
    {salesperson: 'Anne', sales: 41},
    {salesperson: 'Mark', sales: 16},
    {salesperson: 'Joe', sales: 39}
];
   pagination = { page: 1, limit: 100, start: 0 };
    dataLocationsLoding = true;
    noteColors = ['Red', 'Yellow', 'blue'];
    dataProfileLoding = false;
    options: any;
    data: any;
    private el: ElementRef;
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(ElementRef)el: ElementRef, private router: Router, private modalService: BsModalService, private dataService: DataService, private notesService: DataNotesService, private httpService: HttpClient,  private notificationService: NotificationService, private confirmationService: ConfirmationService, private sanitizer: DomSanitizer) {this.el = el; }

    // tslint:disable-next-line:member-ordering
    @ViewChild('myTable') table: any;

    ngOnInit() {
       
        this.httpService.get('./assets/dbDriver.json').subscribe(
            data => {
           this.driverData = data;	 // FILL THE ARRAY WITH DATA.
            },
            (err: HttpErrorResponse) => {
              console.log (err.message);
            }
          );
          this.fileCheck = true;
        this.getLocation();
    // this.generateBarChart();
    this.dataProfileLoding = false;

   }
   
   getLocation() {
       this.handelResponse = true;
   this.dataService.getLocation().subscribe(
    data => {
      this.dataLocationsLoding = false;
      this.dataLocations = data.data;
      this.temp = data.data;
      this.handelResponse = false;
      console.log(this.dataLocations);

    }
);
}
   generateBarChart() {
    // set the dimensions and margins of the graph
    let margin = {top: 5, right: 20, bottom: 30, left: 40};
    let width = 600 - margin.left - margin.right;
    let height = 600 - margin.top - margin.bottom;
    
    //create svg

    let svg = d3.select(this.el.nativeElement).append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background-color', '#efefef');

    //plot area

    let chart = svg.append('g')
    .attr('class', 'bar')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    let xDomain = this.chartdata.map(d => d.salesperson);
    let yDomain = [0, d3.max(this.chartdata, d => d.sales)];

    // set the scale for data domain
    let x = d3.scaleBand()
            .domain(xDomain)
            .rangeRound([0, width])
            .padding(0.2);

    let y = d3.scaleLinear()
            .domain(yDomain)
            .range([height, 0]);

    // add the x Axis
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(y));

    // plot chart with data
    svg.selectAll('bar')
        .data(this.chartdata)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return margin.left + x(d.salesperson) ; })
        .attr('width', x.bandwidth)
        .attr('y', function(d) { return y(d.sales); })
        .attr('height', function(d) { return height - y(d.sales); });
}


// #########################  FILTER FUNCTIONALITY #################################

updateFilterLocation(event) {
    const val = event.target.value.toLowerCase();

    // filter our data

    const tempLocation = this.temp.filter(function(d) {
      return !val || ['name'].some((field: any) => {
        return (d[field].indexOf(val)) !== -1
      })
    });

    // update the rows
    this.dataLocations = tempLocation;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateFilterStore(event) {
    const val = event.target.value.toLowerCase();

    // filter our data

    const tempStore = this.temp1.filter(function(d) {
      return !val || ['name'].some((field: any) => {
        return (d[field].indexOf(val)) !== -1
      })
    });

    // update the rows
    this.remoteStores = tempStore;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
// ######################### END FILTER FUNCTIONALITY ######################################

// ################## ADD NEW Location Modal Functionality ##########################
locationFormChange(type: any) {
    console.log(type)
    switch (type) {
        case  'DB' :
            this.dbCheck = true;
            this.ftpCheck = false;
            this.fileCheck = false;
            this.s3Check = false;
            this.sftpCheck = false;
            break;
            case  'FILE' :
            this.dbCheck = false;
            this.ftpCheck = false;
            this.fileCheck = true;
            this.s3Check = false;
            this.sftpCheck = false;
            break;
            case  'API' :
            this.dbCheck = false;
            this.ftpCheck = false;
            this.fileCheck = true;
            this.s3Check = false;
            this.sftpCheck = false;
            break;
            case  'SFTP' :
            this.dbCheck = false;
            this.ftpCheck = false;
            this.fileCheck = false;
            this.s3Check = false;
            this.sftpCheck = true;
            break;
            case  'FTP' :
            this.dbCheck = false;
            this.ftpCheck = true;
            this.fileCheck = false;
            this.s3Check = false;
            this.sftpCheck = false;
            break;
            case  'S3' :
            this.dbCheck = false;
            this.ftpCheck = false;
            this.fileCheck = false;
            this.s3Check = true;
            this.sftpCheck = false;
            break;
    }
}


getRowData(row) {
console.log(row);
}

loadProfileData () {
    alert("hello")
     
      this.dataProfileLoding = true;
        switch (this.currentLocation.type) {

            case 'HDFS':
            case 'WEBHDFS':

                var hdfsRequest = {
                    location: this.currentLocation.name,
                    filename: this.currentLocationRemoteStore.name,
                    folder: '',
                    numrecords: 100,
                    start: 1,
                    properties: JSON.stringify(this.properties)
                };

                this.dataService.hdfs_Profile(apiRequest).subscribe(
                  data => {
                    this.handleProfileResponse(this, data);

                  });
                break;

            case 'TABLE':
                var tableRequest = {
                    location: this.currentLocation.name,
                    table: this.currentLocationRemoteStore.name,
                    schema: this.currentLocation.schema
                };

                this.dataService.dataProfile(tableRequest).subscribe(
                  data => {
                    this.handleProfileResponse(this, data);

                  });
                break;

            case 'S3':
                var s3Request = {
                    location: this.currentLocation.name,
                    filename: this.currentLocationRemoteStore.name,
                    bucket: this.currentLocation.bucket,
                    numrecords: 100,
                    start: 1,
                    properties: JSON.stringify(this.properties)
                };

                this.dataService.s3_Profile(apiRequest).subscribe(
                  data => {
                    this.handleProfileResponse(this, data);

                  });
                break;

            case 'API':
                var apiRequest = {
                    location: this.currentLocation.name,
                    store: this.currentLocationRemoteStore.name,
                    numrecords: 100,
                    start: 1,
                    properties: JSON.stringify(this.properties)
                };

                this.dataService.api_Profile(apiRequest).subscribe(
                  data => {
                    this.handleProfileResponse(this, data);

                  });
                break;

            case '':

                break;
        }



    }

    handleProfileResponse(page, res) {
      page.dataProfileLoding = false;
      page.profiles = res.data;
      console.log("in handle response",this.profiles);
        /*$timeout(function () {
          this.profiles = res.data;
        }, 500);*/
    }

     remoteStoresLoding = false;
   
     getRemoteStore (loc) {
      this.remoteStores = [];
      this.remoteStoresLoding = true;
        console.log('getRemoteStore called ', loc);
        this.currentLocation = loc;
        this.handelResponseStore = true;
        this.dataService.getRemoteStores(loc).subscribe(
          data => {
            this.remoteStoresLoding = false;
              this.remoteStores = data.data;
              this.temp1 = data.data;
              this.handelResponseStore = false;
          });

    };

    changePropertyGetDataForRemoteStore () {
        console.log("hello")
      this.getDataForRemoteStore(this.currentLocationRemoteStore);
    };



    dataObjectsLoading = false;

    getDataForRemoteStore(remoteSource) {
      this.dataObjects = [];
      this.notesLoading = true;
      this.dataObjectsLoading = true;
        console.log('getDataForRemoteStore called ', remoteSource);
        this.currentLocationRemoteStore = remoteSource;
        this.contentCategory = 'table';
		var fileExtension = this.currentLocationRemoteStore.name.split('.').pop().toLowerCase();
		this.contentType = 'application/json';

		if (fileExtension == 'pdf') {
			this.contentType = 'application/pdf';
			this.contentCategory = 'raw';
		} else if (fileExtension == 'txt') {
		  this.contentType = 'text/plain';
		  this.contentCategory = 'txt';
		  }
		console.log(this.contentType);

        switch (this.currentLocation.type) {

            case 'HDFS':
            case 'WEBHDFS':
                var hdfsRequest = {
                    location: this.currentLocation.name,
                    filename: this.currentLocationRemoteStore.name,
                    folder: '',
                    numrecords: 100,
                    start: 1,
                    properties: JSON.stringify(this.properties)
                };
                this.dataService.getHdfsData(hdfsRequest).subscribe(
                  data => {
                    handleResponse(this, data);
                    this.refresh = false;
                  });

                break;
            case 'DB':
            case 'TABLE':
          
                var tableRequest = {
                    location: this.currentLocation.name,
                    table: this.currentLocationRemoteStore.name,
                    properties: JSON.stringify(this.properties)
                };

                this.dataService.getDbData(tableRequest).subscribe(
                  data => {
                    handleResponse(this, data);
                    this.refresh = true;
                  });
                break;

            case 'S3':
                var s3Request = {
                    location: this.currentLocation.name,
                    filename: this.currentLocationRemoteStore.name,
                    bucket: this.currentLocation.bucket,
                    numrecords: 100,
                    start: 1,
                    properties: JSON.stringify(this.properties)
                };
                this.content = 'Hello Vijay';
               
                if (this.contentCategory != 'table') {
               
                  this.dataService.getS3DataNew(s3Request).subscribe(
                    data => {
                     handleResponse(this, data);
                     this.refresh = false;
                    });

                          } else {
                  this.dataService.getS3Data(s3Request).subscribe(
                    data => {
                      handleResponse(this, data);
                      this.refresh = false;
                    });
                }
                break;

            case 'STREAM':
                var streamRequest = {
                    location: this.currentLocation.name,
                    table: this.currentLocationRemoteStore.name,
                    numrecords: 100,
                    start: 1,
                    properties: JSON.stringify(this.properties)
                };
                this.dataService.getStreamData(streamRequest).subscribe(
                  data => {
                    handleResponse(this, data);
                    this.refresh = false;
                  });

                break;
            case 'SOLR':
                var streamRequest = {
                    location: this.currentLocation.name,
                    table: this.currentLocationRemoteStore.name,
                    numrecords: 100,
                    start: 1,
                    properties: JSON.stringify(this.properties)
                };
                this.dataService.getSolrData(streamRequest).subscribe(
                  data => {
                    handleResponse(this, data);
                    this.refresh = false;
                  });

                break;
            case 'ES':
                var streamRequest = {
                    location: this.currentLocation.name,
                    table: this.currentLocationRemoteStore.name,
                    numrecords: 100,
                    start: 1,
                    properties: JSON.stringify(this.properties)
                };
                this.dataService.getEsData(streamRequest).subscribe(
                  data => {
                    handleResponse(this, data);
                    this.refresh = false;
                  });

                break;

            case 'FILE':
                break;

            case 'API':
                var apiRequest = {
                    location: this.currentLocation.name,
                    store: this.currentLocationRemoteStore.name,
                    numrecords: 100,
                    start: 1,
                    properties: JSON.stringify(this.properties)
                };
                this.dataService.getApiData(apiRequest).subscribe(
                  data => {
                    handleResponse(this, data);
                    this.refresh = false;
                  });

                break;
        }

        function handleResponse (page, res) {

            /*$timeout(function () {
              this.notesLoading = false;
              this.dataObjectsLoading = false;*/

        console.log('Vijay in handle response');
              console.log(page.contentCategory);
              console.log(res);
				if (page.contentCategory == 'txt') {
				 // var enc = new TextDecoder();
				// page.content=enc.decode(res.data);
       			  return;
				}
				if (page.contentCategory == 'raw') {
					console.log(page.contentCategory);

				  var file = new Blob([res.data], {type: page.contentType});
       			  var fileURL = URL.createObjectURL(file);
       			  console.log(fileURL);
       			  page.content = page.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
       			  return;
				}

        page.dataObjects = res;

                var pivotData = [];
                page.dataObjects.body.forEach(function (dataRow, index) {
                    var data = {};
                    page.dataObjects.header.forEach(function (header, index) {
                        data[header] = dataRow[index];
                    });
                    pivotData.push(data);
                });
                page.pivotTable = pivotData;
                console.log(pivotData);
                var container = page.el.nativeElement;
                var inst = jQuery(container);
                var targetElement = inst.find('#pivotOutput');
              var derivers = jQuery.pivotUtilities.derivers;
              var renderers = jQuery.extend(jQuery.pivotUtilities.renderers, jQuery.pivotUtilities.c3_renderers);
        
                if (!targetElement) {
                  console.log('cant find the pivot element');
                  return;
                }


              while (targetElement.firstChild) {
                  targetElement.removeChild(targetElement.firstChild);
                  console.log("not found")
                }

                // here is the magic
                console.log("pivot data", pivotData)
              
                targetElement.pivotUI(pivotData, {
                    renderers: jQuery.pivotUtilities.c3_renderers,
                    cols: [], rows: [],
                    rendererName: "Bar Chart"
                });
              
              
               if (page.currentLocation.type == 'API' ) {
                  page.showAce = true;
                    if (typeof res.body[0] == 'object' && JSON.parse(res.body[0]).error) {
                    this.aceViewSession.getDocument().setValue(JSON.stringify(JSON.parse(res.body[0]).error, null, 2));
                    } else {
                      // tslint:disable-next-line:max-line-length
                      page.aceViewSession.getDocument().setValue(JSON.stringify(typeof res.body[0] == 'object' ? JSON.parse(res.body) : res.body, null, 2));
                    }
                } else {
                  page.showAce = false;
                }

            page.loadNotes();
            page.loadDataStoreNotes();
        }
    };
    pivotTable = [];


    //  ##############******** NOTES FUNCTIONALITY STARTS HERE **********##############
  
    loadNotes () {
        this.notesService.getAllDataSourceNotes({ name: this.currentLocationRemoteStore.name }).subscribe(
        data => {
          this.dataNotes = data.data;
            console.log('Data Notes', this.dataNotes);
            // this.setSelectedNoteRowKey();
        });

    };

    loadDataStoreNotes () {
        this.notesService.getAllDataStoreNotes({ name: this.currentLocationRemoteStore.name }).subscribe(
        data => {
          this.dataStoreNotes = data.data;
        });

    };

    addDataSourceResources () {
        console.log('addDataSourceResources calledaa ', this.newDataLocation);

        //DataSourceResources.dataLocation.create(this.newDataLocation);
    };


    importDataInLake () {
        /*newDataLocation.targetLocation = selectedTargetLocation.name;
        console.log("saveImportData called ", this.newImportData);
        DataSourceResources.import.create(this.newImportData);*/
    };

    saveNote (note) {
        note.dataStoreName = this.currentLocationRemoteStore.name;
        //note.rowKey = this.selectedNoteRowKey;
        this.notesService.addDataSourceNote(note).subscribe(
          data => {
            //this.dataNotes.allRowNotes.push(response.data);
                this.setSelectedNoteRowKey(null);
          });
    };

    updateNote (note) {
      this.notesService.updateDataSourceNote(note).subscribe(
        data => {
          this.setSelectedNoteRowKey(null);
                this.loadNotes();
        });

    }

    deleteNote () {

       /* $rootScope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modules/common/views/common.remove.modal.html',
            controller: 'CommonSmartFormRemoveModalCtrl',
            resolve: {
                title: function () {
                    return 'Note Delete';
                },
                description: function () {
                    return 'Do you really want to Delete this Note?';
                }
            }
        });

        $rootScope.modalInstance.result.then(function () {
            DataSourceResources.getDataSourceNotes.delete({ id: selectedRowNote.id }, {}, function () {
                setSelectedNoteRowKey(null);
                loadNotes();
            });
        });*/
    }

    saveStoreNote (note) {
        note.dataStoreName = this.currentLocationRemoteStore.name;
        //note.rowKey = this.selectedNoteRowKey;
        this.notesService.updateDataStoreNote(note).subscribe(
          data => {
            this.loadDataStoreNotes();
                this.setSelectedNoteRowKey(null);
          });

    };

    updateStoreNote (note) {
      this.notesService.updateDataStoreNote(note).subscribe(
        data => {
          this.setSelectedNoteRowKey(null);
                this.loadDataStoreNotes();
        });

    }

    deleteStoreNote () {
/*
        $rootScope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modules/common/views/common.remove.modal.html',
            controller: 'CommonSmartFormRemoveModalCtrl',
            resolve: {
                title: function () {
                    return 'Note Delete';
                },
                description: function () {
                    return 'Do you really want to Delete this Note?';
                }
            }
        });

        $rootScope.modalInstance.result.then(function () {
            DataSourceResources.getDataStoreNotes.delete({ id: selectedRowNote.id }, {}, function () {
                setSelectedNoteRowKey(null);
                loadDataStoreNotes();
            });
        });*/
    }

    setSelectedNoteRowKey (record) {
       // if (record)
         //   this.selectedNoteRowKey = record.toString() + ':!@#:';
        //this.selectedRowNotes = $filter('filter')(dataNotes.allRowNotes, { rowKey: selectedNoteRowKey }, true);
    }

    getNoteFlag (record) {
        /*if (record && this.dataNotes.allRowNotes) {
            var rowNotes = $filter('filter')(dataNotes.allRowNotes, { rowKey: record.toString() + ':!@#:' }, true);

            if ($filter('filter')(rowNotes, { flag: 3 }, true)[0])
                return 3;
            else if (($filter('filter')(rowNotes, { flag: 2 }, true)[0]))
                return 2;
            else
                return 1;
        }*/
    }

    selectRowNote(note) {
        /*this.selectedRowNote = note;
        rowNote = angular.copy(selectedRowNote);*/
    }
    createnote() {
        /*$rootScope.modalInstance = $uibModal.open({
            templateUrl: "createnotePopup.html",
            controller: function ($scope) {
                noteColors = ["Red", "Yellow", "blue"];
                close = $rootScope.modalInstance.close;
                dismiss = $rootScope.modalInstance.dismiss;
            }


        });*/
    }




    addNote ($event, row, typeOfData) {
        $event.stopPropagation();

        /*var actualNote = angular.copy(row.note);

        $rootScope.modalInstance = $uibModal.open({
            templateUrl: "notePopup.html",
            controller: function ($scope) {

                noteColors = ["Red", "Yellow", "blue"];
                if (!row.note)
                    row.note = {};

                note = row.note;
                close = $rootScope.modalInstance.close;
                dismiss = $rootScope.modalInstance.dismiss;
            }
        });



        $rootScope.modalInstance.result.then(function (result) {
            //TODO: data will be sent to server using ajax here according to typeOfData;
            switch (typeOfData) {
                case 'datasource':
                    //TODO: send 'note' to datasource api
                    break;
                case 'datalocation':
                    //TODO: send  'note' to datalocation api
                    break;
                case 'data':
                    //TODO: send  'note' to data api
                    break;
            }
            console.log(row.note);
        }, function (result) {
            row.note = actualNote;
        });*/
    };
    todoData = [{
        'name': 'test1',
        'merchantid': 'test1',
        'category': 'test1',
        'parent': 'test1',
        'website': 'test1',
        'type': 'test1',
        'contact': 'test1',
        'phone': 'test1',
    },
    {
        'name': 'test1',
        'merchantid': 'test1',
        'category': 'test1',
        'parent': 'test1',
        'website': 'test1',
        'type': 'test1',
        'contact': 'test1',
        'phone': 'test1',
    }]

    aceViewLoaded(_editor) {
      this.aceViewSession = _editor.getSession();
        _editor.setReadOnly(true);
        _editor.setOptions({
            maxLines: 15,
            fontSize: '12pt',
            indent_size: 2
        });
        _editor.getSession().setTabSize(2);
        _editor.getSession().setMode('json');
        _editor.on('change', function (data) {
            // var aceData = _editor.getValue();
            // if (aceData.length > 0) {
            //     var validate = _.isEqual(todoData, JSON.parse(aceData))
            //     if (validate)
            //         showSubmit = false
            //     else
            //         showSubmit = true;
            //     console.log("validate:", validate);
            // }

        })
        this.aceViewSession.getDocument().setValue(JSON.stringify(this.todoData, null, 2));
    };

    showJsonViwer() {
        //$('#jsonViewerPopup').modal('show');
    }







}
