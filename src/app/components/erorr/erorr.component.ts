import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-erorr',
  templateUrl: './erorr.component.html',
  styleUrls: ['./erorr.component.scss']
})
export class ErorrComponent implements OnInit {
  @Input() errorMessage: string;
  constructor() { }

  ngOnInit() {
  }

}
