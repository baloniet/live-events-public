import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'form-button',
    templateUrl: './frmBtn.component.html'
})
export class FormButtonComponent {
    @Input() form;
    @Input() formTitles;
    @Input() isDelete;

    @Output() onBack = new EventEmitter();
    @Output() onSave = new EventEmitter();
    @Output() onDelete = new EventEmitter();

    back(){
        this.onBack.emit();
    }

    save(form: any){
        this.onSave.emit(form);
    }

    delete(form: any){
        this.onDelete.emit(form);
    }
}