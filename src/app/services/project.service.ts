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
    // return this._http.post(this.url + 'save-project', project);
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'save-project', params, {
      headers: headers,
    });
  }

  getProjects(): Observable<any> {
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get(this.url + 'projects');
  }

  getProject(id): Observable<any> {
    return this._http.get(this.url + 'project/' + id);
  }

  deleteProject(id): Observable<any> {
    return this._http.delete(this.url + 'project/' + id);
  }

  // updateProject(project): Observable<any> {
  //   let params = JSON.stringify(project);
  //   return this._http.put(this.url + 'project/' + project._id, params);
  // }
  updateProject(project): Observable<any> {
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + 'project/' + project._id, params, {
      headers: headers,
    });
  }
}
