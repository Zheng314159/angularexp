import { Component } from '@angular/core';

import { MessageService } from '../messageService';

@Component({
    selector: 'app-b1', // 修改为 kebab-case 并以 app- 开头
    template: `
        <div>
            {{ message }}
        </div>
    `,
})

export class BComponent {
    constructor(public srv: MessageService) { }

    message: unknown;

    ngOnInit() {
        this.srv.get().subscribe((result) => {
            this.message = result;
        })
    }

}
