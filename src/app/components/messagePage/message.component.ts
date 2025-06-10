import { Component, OnInit  } from '@angular/core';
import { AComponent } from './A.component';
import { BComponent } from './B.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { MessageService } from '../messageService';

import {  Subject } from 'rxjs';

@Component({
    standalone: true,
    imports: [AComponent, BComponent,CommonModule,FormsModule],
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent  {

    subject: any;
    zhongJieA: any;
    zhongJieB: any;
    ngOnInit(){
        this.subject = new Subject();
        this.subject.subscribe( x => this.zhongJieA = `收到了！${x}`);
        this.subject.subscribe( x => this.zhongJieB = `${x}!恩，好的！`);
    }


    bgFn(){
        this.subject.next(`变更`);
    }




    serviceCode: string = `
        import { Injectable }  from '@angular/core';
        import { Observable, Subject } from 'rxjs';
        @Injectable()
        export class MessageService {
            private subject = new Subject<any>();

            send(message: any) {
                this.subject.next(message);
            }

            get(): Observable<any> {
                return this.subject.asObservable();
            }
        }
    `

    str1: string = `
        // 我创建了一个可观察对象
        let subject = new Subject();

        // 它有2个观察者
        subject.subscribe( x => console.info('观察者A：' + x));
        subject.subscribe( x => console.info('观察者B：' + x));

        // 可观察对象推送一条消息
        subject.next(1);

        输出：
            观察者A：1
            观察者B：1
    `;

    str2: string = `
        // 我创建了一个可观察对象
        let subject = new Subject();

        // 它有2个观察者
        subject.subscribe( x => console.info('观察者A：' + x));
        subject.subscribe( x => console.info('观察者B：' + x));

        // 再创建一个可观察对象
        let observable = Observable.from([1,2,3]);
        // 这里等同于
        //          subject.next(1);
        //          subject.next(2);
        //          subject.next(3);

        // 观察者订阅它
        observable.subscribe(subject);

        输出：
            观察者A：1
            观察者B：1
            观察者A：2
            观察者B：2
            观察者A：3
            观察者B：3

    `;
}
