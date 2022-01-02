import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SlideOptionComponent } from './slide-option.component';

describe('SlideOptionComponent', () => {
  let component: SlideOptionComponent;
  let fixture: ComponentFixture<SlideOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlideOptionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event', () => {
    const spy = spyOn(component.change, 'emit').and.callThrough();
    const event = { checked: true } as MatSlideToggleChange;
    component.changeOption(event);
    expect(spy).toHaveBeenCalled();
  });
});
