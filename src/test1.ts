import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const urlObservable = of(
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2'
);

const fileObservable = urlObservable.pipe(
  mergeMap((url) => ajax.getJSON(url))
);

fileObservable.subscribe((data) => {
  console.log('收到数据:', data);
});
