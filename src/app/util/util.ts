import { LabelService } from './../services/label.service';

export function getLabels(service: LabelService, FORMOBJECT: string): any {
    console.log(90,service);
    service.getLabels('sl', FORMOBJECT)
        .subscribe(
        res => {console.log(res); return res},
        err => {
            console.log("LabelService error: " + err);
        });
}