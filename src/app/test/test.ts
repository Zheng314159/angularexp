import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component ({
  imports: [
    MatSlideToggleModule,
  ],
  templateUrl: './test.html',
})
export class Test implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: object)  { }
  ngOnInit() {




  }
}

