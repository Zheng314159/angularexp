import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRxJS } from './test-rx-js';

describe('TestRxJS', () => {
  let component: TestRxJS;
  let fixture: ComponentFixture<TestRxJS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRxJS]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRxJS);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
