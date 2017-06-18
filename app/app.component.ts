import {Component} from "@angular/core";
import {FileUploadService} from "./services/fileUploade.service";
import {FileModel} from "./models/file.model";

@Component({
    selector: 'app',
    template: `
        <panel>
            <ng-container header>
                <h3>File upload</h3>
            </ng-container>
            <ng-container content>
                <file-upload [(ngModel)]="file"
                             [uploader]="fileUploader"></file-upload>

            </ng-container>
        </panel>`,
    styles  : [`
        :host {
            margin-top: 20px;;
            display: flex;
            justify-content: center;
            align-items: center;
        }`]
})

export class AppComponent {
    public file: FileModel;

    constructor(public fileUploader: FileUploadService) {}

    change(file: FileModel) {
        console.log(file);
    }

}