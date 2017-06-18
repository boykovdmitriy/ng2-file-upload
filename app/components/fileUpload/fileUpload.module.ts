import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {FileUploadComponent} from "./fileUpload.component";

@NgModule({
    imports     : [FormsModule, CommonModule],
    declarations: [FileUploadComponent],
    exports     : [FileUploadComponent]
})

export class FileUploadModule {
}