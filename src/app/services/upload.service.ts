import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from './../models/project';
import { Global } from './global';

@Injectable()
export class UploadtService {
  public url: string;
  constructor() {
    this.url = Global.url;
  }

  makeFileRequest(url: string, params: Array<String>, files: Array<File>, name: string) {
      return new Promise(function(resolve, reject) {
        let formData: any = new FormData();
        let xhr = new XMLHttpRequest();

        for (let i = 0; < FileList.length; i ++) {
            FormData.append(name, file[i], files )
        }
      });
  }
}
