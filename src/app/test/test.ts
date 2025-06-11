import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { interval} from 'rxjs';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.html',
  styleUrl: './test.scss'
})
export class Test implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: object)  { }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {






const someDiv = document.createElement('div');
someDiv.style.cssText = 'width: 200px;background: #09c';
document.body.appendChild(someDiv);
const intervals = interval(10);      // Intervals are scheduled
                                     // with async scheduler by default...
intervals.pipe(
  // observeOn(animationFrameScheduler) // ...but we will observe on animationFrame
)                                    // scheduler to ensure smooth animation.
.subscribe(val => {
  someDiv.style.height = val + 'px';
});












  }
}
}
