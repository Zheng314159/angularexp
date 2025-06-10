// import { of, first,map,take,filter,last,takeLast,skip ,skipLast,skipUntil,skipWhile,distinct} from 'rxjs';

// of(1, 2, 3,4,5,6,5,4)
//   .pipe(map(x =>x*2),filter(v => v > 2),distinct())
//   .subscribe((v) => console.log(`value: ${v}`));

// Logs:
// value: 1
import { timer, map, take } from 'rxjs';

const countdown$ = timer(0, 1000).pipe(
  take(11),                     // 总共发出 11 次（0~10）
  map(i => 10 - i)              // 倒着来：10, 9, ..., 0
);

countdown$.subscribe(x => console.log('倒计时:', x));
