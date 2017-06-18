import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {FileUploadService} from "./services/fileUploade.service";
import {FileUploadModule} from "./components/fileUpload/fileUpload.module";
import {FormsModule} from "@angular/forms";
import {PanelModule} from "./components/panel/panel.module";

@NgModule({
    imports     : [BrowserModule, FormsModule, FileUploadModule, PanelModule],
    declarations: [AppComponent],
    bootstrap   : [AppComponent],
    providers   : [FileUploadService]
})

export class AppModule {

}