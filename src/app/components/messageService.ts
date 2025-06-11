import { Injectable }  from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable()
export class MessageService {
    private subject = new Subject<unknown>();

    send(message: unknown) {
        this.subject.next(message);
    }

    get(): Observable<unknown> {
        return this.subject;
    }
}
