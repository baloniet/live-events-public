import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class LabelService {

    constructor(private http: Http) { }

    getLabels(lang: string, entity: string) {
        return this.http.request('./app/shared/strings/' + lang + '_' + entity + '.json')
            .map(res => res.json());
    }
}