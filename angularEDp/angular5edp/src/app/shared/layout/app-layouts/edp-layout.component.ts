import { Component, OnInit } from '@angular/core';
import {FadeZoomInTop} from "../../animations/fade-zoom-in-top.decorator";

@FadeZoomInTop()
@Component({
  selector: 'app-custom-layout',
  templateUrl: './edp-layout.component.html',
  styles: []
})
export class EdpLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
