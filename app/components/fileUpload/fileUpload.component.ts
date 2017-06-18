import {
    Component, ElementRef, forwardRef, Input, OnInit, ViewChild
} from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/delay";

import {IFileUploadService} from "../../services/fileUploade.service";
import {FileModel} from "../../models/file.model";

@Component({
    selector : 'file-upload',
    styleUrls: ['./fileUpload.style.css'],
    template : `
        <input type="file" id="file" #file (change)="onChange($event)" (click)="click()"
               [disabled]="isDisabled || isLoad">
        <label for="file" [ngClass]="{'disabled':isDisabled || isLoad}">
            <span class="title">{{fileName.length == 0 ? 'Choose a file...' : fileName}}</span>
            <strong class="file-upload-button">
                <i class="fa fa-upload" aria-hidden="true"></i> Choose a file
            </strong>
        </label>
        <div class="progress-bar" *ngIf="isLoad">
            <div class="progress" [style.width]="progress + '%'"></div>
        </div>
    `,
    providers: [
        {
            provide    : NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploadComponent),
            multi      : true
        },
        {
            provide    : NG_VALIDATORS,
            useExisting: forwardRef(() => FileUploadComponent),
            multi      : true
        }
    ]
})

export class FileUploadComponent implements ControlValueAccessor, OnInit {
    @ViewChild('file') fileElement: ElementRef;
    @Input() uploader: IFileUploadService;
    public fileName: string    = "";
    public progress: number;
    public isLoad: boolean     = false;
    public isDisabled: boolean = false;

    private propagateChange: any = () => {};
    private validateFn: any      = () => {};
    private focusObservable: Observable<Event>;
    private focusSubscriber: any;

    constructor() {
        this.validateFn = createFileValidation();
    }

    ngOnInit(): void {
        this.focusObservable = Observable.fromEvent(this.fileElement.nativeElement, 'focus')
                                         .delay(100);
    }

    onChange(event: any) {
        if (!this.uploader)
            throw new Error('For uploading files need a file upload service');
        if (event.srcElement.value != 0) {
            this.fileName = event.srcElement.files[0].name;
            this.isLoad   = true;
            this.progress = 0;
            this.uploader.uploadFile()
                .subscribe((progress) => this.progress = progress,
                    (err) => {this.isLoad = false;},
                    () => {
                        this.propagateChange(new FileModel('someId', this.fileName));
                        this.isLoad = false;
                    });
        }
    }

    click() {
        this.focusSubscriber = this.focusObservable.subscribe((x) => {
            if (!!this.focusSubscriber)
                this.focusSubscriber.unsubscribe();
            if (this.fileName.length == 0) {
                this.propagateChange(null);
                alert('you does not selected file');
            }
        });
    }

    writeValue(value: FileModel): void {
        if (!!value) {
            this.fileName = value.fileName;
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    validate(c: FormControl): any {
        return this.validateFn(c);
    }
}


function createFileValidation() {
    return (c: FormControl) => {
        let err = {dateError: "File doesn't selected"};
        return !!c.value && !!c.value ? null : err;
    }
}