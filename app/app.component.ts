import {Component, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {FileUploadService} from "./services/fileUploade.service";
import {FileModel} from "./models/file.model";
import {NotificationManager} from "./modals/notification.manager";
import {ModalDialogComponent} from "./modals/modalDialog/modalDialog.component";

@Component({
    selector: 'app',
    template: `
        <panel>
            <ng-container header>
                <h3>File upload</h3>
            </ng-container>
            <ng-container content>
                <file-upload [(ngModel)]="file"
                             (canceled)="canceled()"
                             [uploader]="fileUploader"></file-upload>

            </ng-container>
        </panel>
        <section #notificationBlock></section>
    `,
    styles  : [`
        :host {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }`]
})

export class AppComponent implements OnInit {
    @ViewChild('notificationBlock', {read: ViewContainerRef}) notificationBlock: ViewContainerRef;

    public file: FileModel;

    constructor(public fileUploader: FileUploadService, private notificationManager: NotificationManager) {}

    public ngOnInit(): void {
        this.notificationManager.init(this.notificationBlock);
    }

    public canceled() {
        this.notificationManager.showDialog(ModalDialogComponent,'Warning','File selection canceled');
    }
}