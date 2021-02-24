import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from './../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }
  testService() {
    return 'Probando el servicio';
  }

  saveProject(project: Project) {
    // let params: JSON["stringify"];
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // return this._http.post(this.url + 'save-project', params, {headers: 'headers'})
    return this._http.post(this.url + 'save-project', project);
  }
}
