import { Component, ElementRef } from '@angular/core';
import { instance, mock } from 'ts-mockito';
import { ColorProgressBarDirective } from './color-progress-bar.directive';

describe('ColorProgressBarDirective', () => {
  let directive: ColorProgressBarDirective;
  let elementRef: ElementRef<any>;
  beforeEach(() => {
    const elementMock = mock(Component);
    elementRef = instance(elementMock);
    directive = new ColorProgressBarDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
