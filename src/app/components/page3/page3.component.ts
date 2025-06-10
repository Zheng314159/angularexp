import { Component, AfterViewInit, Inject } from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports: [CommonModule,FormsModule],
    templateUrl: './page3.component.html',
    styleUrls: ['./page3.component.scss']
})
export class Page3Component implements AfterViewInit {
    sum: number = 0;
    clientX: number = 0;

    jlfCode: string = `
        Operators 中的 throttleTime 节流时间

        let sum = 0;
        let sumBtn = document.querySelectorAll('button.clickSum');
        fromEvent(sumBtn, 'click')
            .pipe(throttleTime(3000))                 // 节流时间， 3000ms = 3s
            .subscribe(() => sum++);
    `

    mapCode: string = `
        Operators 中的 map 操作符
        let mapBtn = document.querySelectorAll('button.clickMap');
        fromEvent(mapBtn, 'click')
            .pipe(
                throttleTime(1000),
                map(event => event['clientX'])
            )
            .subscribe((event) => this.clientX = event);

        这里可以看到 map() 需要传1个参数，这里处理完成后再传给 订阅者就是直接处理后的结果。
    `;

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            let sumBtn = document.querySelectorAll('button.clickSum');
            fromEvent(sumBtn, 'click')
                .pipe(throttleTime(3000))
                .subscribe(() => {this.sum++;
                  this.cdr.detectChanges(); // 确保视图更新
                });

            let mapBtn = document.querySelectorAll('button.clickMap');
            fromEvent(mapBtn, 'click')
                .pipe(
                    throttleTime(1000),
                    map(event => event['clientX'])
                )
                .subscribe((event) => {this.clientX = event;
                  this.cdr.detectChanges();
                });
        }
    }
}
