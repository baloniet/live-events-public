import { Component, Input } from '@angular/core';

@Component({
    selector: 'form-title',
    templateUrl: './frmTitle.component.html'
})
export class FormTitleComponent {
    @Input() param;
    @Input() formTitles;
    @Input() isDelete;
}