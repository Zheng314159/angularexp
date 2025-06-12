import {  Observable } from 'rxjs';


 const foo = new Observable( (observer) => {
            observer.next('hello');    observer.next('end');
            observer.next('restart');
        });

        // 观察者订阅执行
     foo.subscribe( (x) => console.info(x));


