import { of, subscribeOn, asyncScheduler, merge, Subject, Observable } from 'rxjs';


 let foo = new Observable( (observer) => {
            observer.next('hello');
            observer.next('end');
            observer.next('restart');
        });

        // 观察者订阅执行
        foo.subscribe( (x) => console.info(x));

