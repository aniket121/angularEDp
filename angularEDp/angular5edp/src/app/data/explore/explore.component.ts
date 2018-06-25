import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Inject,    AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from '../data.service';
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

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css', '../../smart-admin.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DataService, ConfirmationService]

})
export class ExploreComponent implements OnInit {
    private el: ElementRef;
  controls = {filter: ''};
  content = "";
  bsModalRef: BsModalRef;
  public termsAgreed = false
  dataLocations: any[] = [];
  profiles: any[] = [];
  properties: any[] = [];
  remoteStores: any[] = [];
  currentLocation = null;
  currentLocationRemoteStore = null;
  newDataLocation = {};
  importdata = [];
  newImportData = {};
  editproperty = false;
  selectedTargetLocation = "";
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
  buttonText = "Ok";
  storeData: any;
  temp: any[] = [];
  aceViewSession = undefined;

  public information = { id: ''}
  partitions = {
      "filename": "FILENAME",
      "day": "DAY",
      "month": "MONTH"
  };

    fileFormats = {
        'text': 'TEXT',
        'sequence': 'SEQUENCE',
        'parquet': 'PARQUET',
        'orc': 'ORC'
    };

    compressions = {
        "no": "NO",
        "gz": "GZ",
        "zip": "ZIP",
        "snappy": "snappy",
        "lz4": "LZ4"
    };
    pagination = { page: 1, limit: 100, start: 0 };
    dataLocationsLoding = true;
    noteColors = ['Red', 'Yellow', 'blue'];
    dataProfileLoding = false;
// tslint:disable-next-line:max-line-length
public storeDataInfo = {created: '', lastProfiled: '', name: '', profile : '', size: '', tags: '', type: '', properties: { bucket: '', encryption: '' , etag: ''}}
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(ElementRef)el: ElementRef, private router: Router, private modalService: BsModalService, private dataService: DataService, private httpService: HttpClient, private notificationService: NotificationService, private confirmationService: ConfirmationService) {
    this.el = el;
  }

   ngOnInit() {
        this.dataService.getLocation().subscribe(
        data => {
          this.dataLocationsLoding = false;
          this.dataLocations = data.data;
          console.log(this.dataLocations);

        }

    );


    this.httpService.get<any>('./assets/dbDriver.json').subscribe(
      data => {
        this.properties = data;
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );

    this.dataProfileLoding = false;
    this.buildPivot();
   }

   private buildPivot() {

    if (!this.el ||
        !this.el.nativeElement ||
        !this.el.nativeElement.children) {
            console.log('cant build without element');
            return;
    }

    const container = this.el.nativeElement;
const inst = jQuery(container);

    //the below id should be on your html element like div for the pivot
    //per the exmapmle in thepivot docs
    const targetElement = inst.find('#output');

    if (!targetElement) {
        console.log('cant find the pivot element');
        return;
    }

    //this helps if you build more than once as it will wipe the dom for that element
    while (targetElement.firstChild) {
        targetElement.removeChild(targetElement.firstChild);
    }

    // here is the magic
    // targetElement.pivotUI([
    //     { 'Province': 'Quebec', 'Party': 'NDP', 'Age': 22, 'Name': 'Liu, Laurin', 'Gender': 'Female' },
    //     { 'Province': 'Quebec', 'Party': 'Bloc Quebecois', 'Age': 43, 'Name': 'Mourani, Maria', 'Gender': 'Female' },
    //     { 'Province': 'Quebec', 'Party': 'NDP', 'Age': '', 'Name': 'Sellah, Djaouida', 'Gender': 'Female' },
    //     { 'Province': 'Quebec', 'Party': 'NDP', 'Age': 72, 'Name': 'St-Denis, Lise', 'Gender': 'Female' },
    //     { 'Province': 'British Columbia', 'Party': 'Liberal', 'Age': 71, 'Name': 'Fry, Hedy', 'Gender': 'Female' }],
    //     {
    //     // renderers:renderers,
    //       cols: ['Party'], rows: ['Province'],
    //       rendererName: 'Horizontal Stacked Bar Chart',
    //       rowOrder: 'value_z_to_a', colOrder: 'value_z_to_a',
    //       rendererOptions: {
    //         c3: {
    //           data: {
    //             colors: {
    //               Liberal: '#dc3912', Conservative: '#3366cc', NDP: '#ff9900',
    //               Green: '#109618', 'Bloc Quebecois': '#990099'
    //             }
    //           }
    //         }
    //       }
    //     });
    targetElement.pivot(
        [
            {color: "blue", shape: "circle"},
            {color: "red", shape: "triangle"}
        ],
        {
            rows: ["color"],
            cols: ["shape"]
        }
    );
//    targetElement.pivot([
//         {color: "blue", shape: "circle"},
//         {color: "red", shape: "triangle"}
//     ],
//     {
//         rows: ["color"],
//         cols: ["shape"]
//     });


}

  getRow() {
   console.log('row selected');
  }



    loadProfileData () {
     /* this.dataProfileLoding = true;
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

                DataSourceResources.hdfs_Profile.query(hdfsRequest, handleResponse);
                break;

            case 'TABLE':
                var tableRequest = {
                    location: this.currentLocation.name,
                    table: this.currentLocationRemoteStore.name,
                    schema: this.currentLocation.schema
                };

                DataSourceResources.dataProfile.query(tableRequest, handleResponse);
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

                DataSourceResources.s3_Profile.query(s3Request, handleResponse);
                break;

            case 'API':
                var apiRequest = {
                    location: this.currentLocation.name,
                    store: this.currentLocationRemoteStore.name,
                    numrecords: 100,
                    start: 1,
                    properties: JSON.stringify(this.properties)
                };

                DataSourceResources.api_Profile.query(apiRequest, handleResponse);
                break;

            case '':

                break;
        }

        function handleResponse(res) {
          this.dataProfileLoding = false;
          this.profiles = res.data;
            /*$timeout(function () {
              this.profiles = res.data;
            }, 500);
      }*/

    }
    getRemoteStores(row) {
        this.dataService.getRemoteStores(row).subscribe(
            data => {
               this.storeData = data.data;
               this.temp = data.data;
                //this.handelResponse = false;
                console.log(this.storeData);
     
            }
         );

    }
    
    remoteStoresLoding = false;
    getRemoteStore = function (loc) {
      this.remoteStores = [];
      this.remoteStoresLoding = true;
        console.log('getRemoteStore called ', loc);
        this.currentLocation = loc;


        /*DataSourceResources.getRemoteStore.query({ location: loc.name }, function (res) {
            $timeout(function () {
              this.remoteStoresLoding = false;
              this.remoteStores = res.data;
            }, 500);


        });*/
    };

    changePropertyGetDataForRemoteStore () {
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

		if (fileExtension == 'pdf')
		{
			this.contentType = 'application/pdf';
			this.contentCategory = 'raw';
		}
		else if (fileExtension == 'txt')
		{
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

                //DataSourceResources.getHdfsData.query(hdfsRequest, handleResponse);
                break;
            case 'DB':
            case 'TABLE':
                var tableRequest = {
                    location: this.currentLocation.name,
                    table: this.currentLocationRemoteStore.name,
                    properties: JSON.stringify(this.properties)
                };

                //DataSourceResources.getDbData.query(tableRequest, handleResponse);
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
				if (this.contentCategory != 'table')
				{
					//DataSourceResources.getS3DataNew.query(s3Request, handleResponse);
                	}
                	else
                		//DataSourceResources.getS3Data.query(s3Request, handleResponse);
                break;

            case 'STREAM':
                var streamRequest = {
                    location: this.currentLocation.name,
                    table: this.currentLocationRemoteStore.name,
                    numrecords: 100,
                    start: 1,
                    properties: JSON.stringify(this.properties)
                };

                //DataSourceResources.getStreamData.query(streamRequest, handleResponse);
                break;
            case 'SOLR':
                var streamRequest = {
                    location: this.currentLocation.name,
                    table: this.currentLocationRemoteStore.name,
                    numrecords: 100,
                    start: 1,
                    properties: JSON.stringify(this.properties)
                };

                //DataSourceResources.getSolrData.query(streamRequest, handleResponse);
                break;
            case 'ES':
                var streamRequest = {
                    location: this.currentLocation.name,
                    table: this.currentLocationRemoteStore.name,
                    numrecords: 100,
                    start: 1,
                    properties: JSON.stringify(this.properties)
                };

                //DataSourceResources.getEsData.query(streamRequest, handleResponse);
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

                //DataSourceResources.getApiData.query(apiRequest, handleResponse);
                break;
        }

        function handleResponse(res) {

            /*$timeout(function () {
              this.notesLoading = false;
              this.dataObjectsLoading = false;

				console.log(this.contentCategory);
				if(this.contentCategory=='txt')
				{
				  var enc = new TextDecoder();
				  this.content=enc.decode(res.data);
       			  return;
				}
				if(this.contentCategory=='raw')
				{
					console.log(this.contentCategory);

				  var file = new Blob([res.data], {type: this.contentType});
       			  var fileURL = URL.createObjectURL(file);

       			  this.content=$sce.trustAsResourceUrl(fileURL);
       			  return;
				}

        this.dataObjects = res;

                var pivotData = [];
                angular.forEach(this.dataObjects.body, function (dataRow, index) {
                    var data = {};
                    angular.forEach(this.dataObjects.header, function (header, index) {
                        data[header] = dataRow[index];
                    });
                    pivotData.push(data);
                });
                this.pivotTable = pivotData;

                if (this.currentLocation.type == "API" ) {
                  this.showAce = true;
                    if (typeof res.body[0] == "object"&&JSON.parse(res.body[0]).error)
                    this.aceViewSession.getDocument().setValue(JSON.stringify(JSON.parse(res.body[0]).error, null, 2));
                    else {
                      this.aceViewSession.getDocument().setValue(JSON.stringify(typeof res.body[0] == "object"?JSON.parse(res.body):res.body, null, 2));
                    }
                }
                else {
                  this.showAce = false;
                }

            }, 500);*/

            this.loadNotes();
            this.loadDataStoreNotes();
        }
    };
    pivotTable = [];
    
    loadNotes () {
        /*DataSourceResources.getDataSourceNotes.query({ name: currentLocationRemoteStore.name }, function (response) {
          this.dataNotes = response.data;
            console.log("Data Notes", this.dataNotes);
            this.setSelectedNoteRowKey();
        });*/

    }

    loadDataStoreNotes () {
        /*DataSourceResources.getDataStoreNotes.query({ name: currentLocationRemoteStore.name }, function (response) {
            $timeout(function () {
              this.dataStoreNotes = response.data;
            }, 500);
        });*/
    }

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
        /*note.dataStoreName = currentLocationRemoteStore.name;
        note.rowKey = selectedNoteRowKey;
        DataSourceResources.getDataSourceNotes.add(note, function (response) {
            if (response.success) {
                dataNotes.allRowNotes.push(response.data);
                setSelectedNoteRowKey(null);
            }
        });*/
    };

    updateNote (note) {
       /* DataSourceResources.getDataSourceNotes.update(note, function (response) {
            if (response.success) {
                setSelectedNoteRowKey(null);
                loadNotes();
            }
        });*/
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
        /*note.dataStoreName = currentLocationRemoteStore.name;
        note.rowKey = selectedNoteRowKey;
        DataSourceResources.getDataStoreNotes.add(note, function (response) {
            if (response.success) {
                loadDataStoreNotes();
                setSelectedNoteRowKey(null);
            }
        });*/
    };

    updateStoreNote (note) {
        /*DataSourceResources.getDataStoreNotes.update(note, function (response) {
            if (response.success) {
                setSelectedNoteRowKey(null);
                loadDataStoreNotes();
            }
        });*/
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
        /*if (record)
            selectedNoteRowKey = record.toString() + ':!@#:';
        selectedRowNotes = $filter('filter')(dataNotes.allRowNotes, { rowKey: selectedNoteRowKey }, true);*/
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
       // $('#jsonViewerPopup').modal('show');
    }







}
