import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { from } from 'rxjs';
import * as jQuery from 'jquery';
@Component({
  standalone: true,
  selector: 'app-test-rx-js',
  imports: [],
  templateUrl: './test-rx-js.html',
  styleUrl: './test-rx-js.scss'
})
export class TestRxJS implements OnInit {
  ngOnInit() {
    // const urlObservable = of(
    //   'https://jsonplaceholder.typicode.com/posts/1',
    //   'https://jsonplaceholder.typicode.com/posts/2'
    // );

    // const fileObservable = urlObservable.pipe(
    //   mergeMap((url) => ajax.getJSON(url))
    // );

    // fileObservable.subscribe((data) => {
    //   console.log('收到数据:', data);
    // });

    function getJSONAsObservable(url: string) {
  return from(
    new Promise((resolve, reject) => {
      jQuery.getJSON(url)
        .done((data) => resolve(data))
        .fail((jqXHR, textStatus, errorThrown) => reject(errorThrown));
    })
  );
}

// 使用
getJSONAsObservable('https://jsonplaceholder.typicode.com/posts/1').subscribe({
  next: (data) => console.log('成功:', data),
  error: (err) => console.error('错误:', err),
});




  }
}
