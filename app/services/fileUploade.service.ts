import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";

export interface IFileUploadService {
    uploadFile(): Observable<number>;
}

@Injectable()
export class FileUploadService implements IFileUploadService {

    public uploadFile(): Observable<number> {
        return Observable
            .interval(1000)
            .take(10).map(x => (x + 1)*10);
    }
}