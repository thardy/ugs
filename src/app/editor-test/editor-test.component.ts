import { Component, OnInit } from '@angular/core';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/json';
import 'brace/mode/text';
import 'brace/theme/github';

@Component({
  selector: 'ugs-editor-test',
  templateUrl: './editor-test.component.html',
  styleUrls: ['./editor-test.component.scss']
})
export class EditorTestComponent implements OnInit {
  config: AceConfigInterface;
  content: string;

  constructor() {
    // this.config = {
    //   mode: 'json',
    //   theme: 'github',
    //   readOnly : false
    // };
    this.config = {};

    this.content = 'hello world!';
  }

  ngOnInit(): void {
  }

}
