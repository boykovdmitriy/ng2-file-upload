import {NgModule}      from '@angular/core';
import {NotificationManager} from "./notification.manager";
import {ModalDialogComponent} from "./modalDialog/modalDialog.component";

@NgModule({
    declarations   : [ModalDialogComponent],
    entryComponents: [ModalDialogComponent],
    providers      : [NotificationManager]
})
export class NotificationModule {
}