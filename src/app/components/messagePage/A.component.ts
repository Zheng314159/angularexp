import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MessageService } from '../messageService';

@Component({
      standalone: true,
    imports: [CommonModule, FormsModule],
    selector: 'A1',
    template: `
        <div>
            <input type="text" [(ngModel)]="inputText" name="text">
            <input type="button" value="发送" (click)="toSend()">
        </div>
    `,
})

export class AComponent {
    inputText: any = "";

    constructor(public srv: MessageService) { }


    toSend(){
        this.srv.send(this.inputText);
    }
}
