import {
    Component
} from "@angular/core";
import {
    ModalDialogResult,
    ModalDialogBase
} from "../modalDialog.base";
import {Subject} from "rxjs";

@Component({
    selector   : 'modal-dialog',
    templateUrl: './modalDialog.template.html',
    styleUrls  : ['./modalDialog.style.css']
})

export class ModalDialogComponent extends ModalDialogBase {
    private header: string;
    private description: string;
    private modalState: Subject<ModalDialogResult>;

    constructor() {
        super();
        this.modalState = new Subject();
    }

    public getDialogState(): Subject<ModalDialogResult> {
        return this.modalState;
    }

    private confirm() {
        this.modalState.next(ModalDialogResult.Confirmed);
    }

    private close() {
        this.modalState.next(ModalDialogResult.Closed);
    }
}