import { Component, OnInit } from '@angular/core';
import { Project } from './../../models/project';
import { ProjectService } from './../../services/project.service';
import { UploadtService } from './../../services/upload.service';
import { Global } from './../../services/global';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ProjectService, UploadtService],
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: any;
  public save_project;

  constructor(
    private projectService: ProjectService,
    private uploadService: UploadtService
  ) {
    this.title = 'Crear proyecto';
    this.project = new Project('', '', '', '', 2021, '', '');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    // Guardar datos básicos
    this.projectService.saveProject(this.project).subscribe(
      (response) => {
        if (response['project']) {
          // Subir la imagen
          if (this.filesToUpload) {
            this.uploadService
              .makeFileRequest(
                Global.url + 'upload-image/' + response['project']['_id'],
                [],
                this.filesToUpload,
                'image'
              )
              .then((result: any) => {
                this.save_project = result.project;

                this.status = 'success';
                form.reset();
              });
          } else {
            this.save_project = response['project'];
            this.status = 'success';
            form.reset();
          }
        } else {
          this.status = 'failed';
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  // onSubmit(form) {
  //   console.log(this.project);
  //   this.projectService.saveProject(this.project).subscribe(
  //     (response) => {
  //       console.log('response: ', response);
  //       if (response['project']) {
  //         const id = response['project']['_id'];
  //         console.log('id: ', id);

  //         // Subir imagen
  //         if (this.filesToUpload) {
  //           this.uploadService
  //             .makeFileRequest(
  //               Global.url + 'upload-image/' + id,
  //               [],
  //               this.filesToUpload,
  //               'image'
  //             )
  //             .then((result: any) => {
  //               this.save_project = result.project;
  //               this.status = 'success';
  //               console.log(result);
  //               form.reset();
  //             });
  //         } else {
  //           this.save_project = response['project'];
  //           this.status = 'success';

  //         }
  //       } else {
  //         this.status = 'failed';
  //       }
  //     },
  //     (error) => {
  //       console.log(<any>error);
  //     }
  //   );
  // }
}
