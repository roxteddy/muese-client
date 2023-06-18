import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './progress-bar/slider.component';

@NgModule({
  declarations: [
    SliderComponent
  ],
    imports: [
        CommonModule
    ],
    exports: [
        SliderComponent
    ]
})
export class AppUiModule { }
