(self["webpackChunkmuese_client"] = self["webpackChunkmuese_client"] || []).push([["main"],{

/***/ 2304:
/*!*************************************!*\
  !*** ./src/app-ui/app-ui.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppUiModule: () => (/* binding */ AppUiModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _progress_bar_slider_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress-bar/slider.component */ 7830);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);



class AppUiModule {}
AppUiModule.ɵfac = function AppUiModule_Factory(t) {
  return new (t || AppUiModule)();
};
AppUiModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: AppUiModule
});
AppUiModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppUiModule, {
    declarations: [_progress_bar_slider_component__WEBPACK_IMPORTED_MODULE_0__.SliderComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
    exports: [_progress_bar_slider_component__WEBPACK_IMPORTED_MODULE_0__.SliderComponent]
  });
})();

/***/ }),

/***/ 2856:
/*!***************************************************************!*\
  !*** ./src/app-ui/balance-button/balance-button.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BalanceButtonComponent: () => (/* binding */ BalanceButtonComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);


const _c0 = ["*"];
class BalanceButtonComponent {
  constructor() {
    this.ariaLabel = 'Undefined balance button';
    this.balance = 0;
    this.balanceChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.isDragged = false;
  }
  getAriaValueText(balance) {
    if (balance < 0) {
      return `Left ${Math.round(balance * -1 * 100)} percent`;
    } else if (balance > 0) {
      return `Right ${Math.round(balance * 100)} percent`;
    } else {
      return `Middle`;
    }
  }
  onPanStart(e) {
    e.preventDefault();
    this.isDragged = true;
    document.body.style.cursor = 'ew-resize';
  }
  onPanMove(e) {
    if (this.isDragged) {
      e.preventDefault();
      this.setBalance(this.calcBalance(e));
    }
  }
  onPanEnd(e) {
    if (this.isDragged) {
      e.preventDefault();
      this.isDragged = false;
      document.body.style.cursor = 'unset';
    }
  }
  onDoubleClick(e) {
    if (e.tapCount === 2) {
      this.setBalance(0);
    }
  }
  setBalance(balance) {
    this.balance = balance;
    this.balanceChange.emit(balance);
  }
  calcBalance(e) {
    let balance = e.deltaX / 100;
    if (balance < -1) {
      balance = -1;
    } else if (balance > 1) {
      balance = 1;
    }
    return balance;
  }
}
BalanceButtonComponent.ɵfac = function BalanceButtonComponent_Factory(t) {
  return new (t || BalanceButtonComponent)();
};
BalanceButtonComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: BalanceButtonComponent,
  selectors: [["app-ui-balance-button"]],
  hostBindings: function BalanceButtonComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("panstart", function BalanceButtonComponent_panstart_HostBindingHandler($event) {
        return ctx.onPanStart($event);
      })("panmove", function BalanceButtonComponent_panmove_HostBindingHandler($event) {
        return ctx.onPanMove($event);
      })("panend", function BalanceButtonComponent_panend_HostBindingHandler($event) {
        return ctx.onPanEnd($event);
      })("tap", function BalanceButtonComponent_tap_HostBindingHandler($event) {
        return ctx.onDoubleClick($event);
      });
    }
  },
  inputs: {
    ariaLabel: "ariaLabel",
    balance: "balance"
  },
  outputs: {
    balanceChange: "balanceChange"
  },
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
  ngContentSelectors: _c0,
  decls: 5,
  vars: 6,
  consts: [["role", "spinbutton", "tabindex", "0", "aria-valuemin", "-1", "aria-valuemax", "1", 1, "wrapper"], [1, "logo"], [1, "round"], [1, "dot"]],
  template: function BalanceButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", ctx.isDragged);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", ctx.ariaLabel)("aria-valuetext", ctx.getAriaValueText(ctx.balance));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("transform", "rotate(" + 135 * ctx.balance + "deg)");
    }
  },
  styles: [".wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.wrapper[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {\n  width: 50%;\n  height: 50%;\n  text-align: center;\n  font-weight: bolder;\n  font-size: 36px;\n  color: black;\n  position: absolute;\n  top: 25%;\n  left: 25%;\n  z-index: 1;\n}\n.wrapper[_ngcontent-%COMP%]   .round[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: white;\n  border-radius: 50%;\n  position: absolute;\n  transform: rotate(0deg);\n}\n.wrapper[_ngcontent-%COMP%]   .round[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  height: 0;\n  width: 2px;\n  border-top: 6px solid #8688FF;\n  border-left: 0.1px solid transparent;\n  border-right: 0.1px solid transparent;\n  position: absolute;\n  left: calc(50% - 1px);\n  top: 2px;\n}\n.wrapper.active[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {\n  color: white;\n}\n.wrapper.active[_ngcontent-%COMP%]   .round[_ngcontent-%COMP%] {\n  background-color: #8688FF;\n}\n.wrapper.active[_ngcontent-%COMP%]   .round[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  border-top-color: white;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAtdWkvYmFsYW5jZS1idXR0b24vYmFsYW5jZS1idXR0b24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBQ0o7QUFDSTtFQUNJLFVBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUFDUjtBQUVJO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFFQSx1QkFBQTtBQURSO0FBR1E7RUFDSSxTQUFBO0VBQ0EsVUFBQTtFQUNBLDZCQUFBO0VBQ0Esb0NBQUE7RUFDQSxxQ0FBQTtFQUdBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxRQUFBO0FBSFo7QUFTUTtFQUNJLFlBQUE7QUFQWjtBQVVRO0VBQ0kseUJBQUE7QUFSWjtBQVVZO0VBQ0ksdUJBQUE7QUFSaEIiLCJzb3VyY2VzQ29udGVudCI6WyIud3JhcHBlciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgIC5sb2dvIHtcbiAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgaGVpZ2h0OiA1MCU7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbiAgICAgICAgZm9udC1zaXplOiAzNnB4O1xuICAgICAgICBjb2xvcjogYmxhY2s7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAyNSU7XG4gICAgICAgIGxlZnQ6IDI1JTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICB9XG5cbiAgICAucm91bmQge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogY2FsYygxMDAlIC8gMik7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcblxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcblxuICAgICAgICAuZG90IHtcbiAgICAgICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgICAgIHdpZHRoOiAycHg7XG4gICAgICAgICAgICBib3JkZXItdG9wOiA2cHggc29saWQgIzg2ODhGRjtcbiAgICAgICAgICAgIGJvcmRlci1sZWZ0OiAwLjFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMC4xcHggc29saWQgdHJhbnNwYXJlbnQ7XG5cblxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgbGVmdDogY2FsYyg1MCUgLSAxcHgpO1xuICAgICAgICAgICAgdG9wOiAycHg7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgICYuYWN0aXZlIHtcbiAgICAgICAgLmxvZ28ge1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgLnJvdW5kIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM4Njg4RkY7XG5cbiAgICAgICAgICAgIC5kb3Qge1xuICAgICAgICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
  changeDetection: 0
});

/***/ }),

/***/ 7830:
/*!*****************************************************!*\
  !*** ./src/app-ui/progress-bar/slider.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SliderComponent: () => (/* binding */ SliderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6575);



const _c0 = function (a0) {
  return {
    dragged: a0
  };
};
function SliderComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 4);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("transform", "translateX(" + ctx_r1.progressStatus.progress * _r0.offsetWidth + "px)");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c0, !!ctx_r1.progressStatus.rect && !ctx_r1.wheeling));
  }
}
const _c1 = function (a0, a1) {
  return {
    faded: a0,
    dragged: a1
  };
};
;
class SliderComponent {
  constructor(elementRef) {
    this.elementRef = elementRef;
    this.ariaLabel = 'Undefined slider';
    this.dragged = false;
    this.duration = -1;
    this.emitSeekOnWheel = false;
    this.faded = false;
    this.hasButton = false;
    this.scrollGranularity = 0.05;
    this.progress = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.progressStatus = {
      rect: null,
      progress: 0
    };
    this.wheeling = -1;
  }
  ngOnChanges(changes) {
    if (changes['seek']) {
      const progress = changes['seek'].currentValue;
      if (typeof progress !== 'undefined') {
        this.progressStatus = {
          ...this.progressStatus,
          progress
        };
      }
    }
  }
  getAriaValueText(time, progressStatus) {
    let ariaValueText;
    if (time === -1) {
      ariaValueText = progressStatus.progress * 100 + ' percent';
    } else {
      const currentTime = Math.round(this.duration * this.progressStatus.progress);
      let minutes = Math.floor(currentTime / 60);
      let seconds = currentTime % 60;
      ariaValueText = `${minutes} minutes`;
      if (seconds) {
        ariaValueText += ` and ${seconds} seconds`;
      }
      minutes = Math.floor(time / 60);
      seconds = time % 60;
      ariaValueText += ` on ${minutes} minutes`;
      if (seconds) {
        ariaValueText += ` and ${seconds} seconds`;
      }
    }
    return ariaValueText;
  }
  handleKeyPress(e) {
    console.log(e);
    if (e.code == 'ArrowLeft') {
      e.preventDefault();
      const progress = this.progressStatus.progress - 0.01;
      this.progressStatus = {
        ...this.progressStatus,
        progress: progress < 0 ? 0 : progress
      };
      this.progress.emit(this.progressStatus);
    } else if (e.code == 'ArrowRight') {
      e.preventDefault();
      const progress = this.progressStatus.progress + 0.01;
      this.progressStatus = {
        ...this.progressStatus,
        progress: progress > 1 ? 1 : progress
      };
      this.progress.emit(this.progressStatus);
    }
  }
  onTap(e) {
    this.progressStatus = {
      ...this.progressStatus,
      progress: this.calculateProgress(e.srcEvent, this.elementRef.nativeElement.getBoundingClientRect())
    };
    this.progress.emit(this.progressStatus);
  }
  onMouseDown(e) {
    e.preventDefault();
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    this.progressStatus = {
      rect,
      progress: this.calculateProgress(e.srcEvent, rect)
    };
    this.progress.emit(this.progressStatus);
    document.body.style.cursor = 'ew-resize';
  }
  onWheel(e) {
    e.preventDefault();
    if (this.wheeling > -1) {
      clearTimeout(this.wheeling);
      this.wheeling = -1;
    }
    let progress = this.progressStatus.progress - e.deltaY * 0.01 * this.scrollGranularity;
    if (progress < 0) {
      progress = 0;
    } else if (progress > 1) {
      progress = 1;
    }
    this.progressStatus = {
      ...this.progressStatus,
      progress
    };
    if (!this.emitSeekOnWheel) {
      this.wheeling = setTimeout(() => {
        this.progressStatus = {
          ...this.progressStatus,
          rect: null
        };
        this.progress.emit(this.progressStatus);
        this.wheeling = -1;
      }, 150);
      this.progressStatus.rect = e.target.getBoundingClientRect();
    }
    this.progress.emit(this.progressStatus);
  }
  documentMouseMove(e) {
    if (this.progressStatus.rect) {
      e.preventDefault();
      this.progressStatus = {
        ...this.progressStatus,
        progress: this.calculateProgress(e.srcEvent, this.progressStatus.rect)
      };
      this.progress.emit(this.progressStatus);
      ;
    }
  }
  windowMouseUp(e) {
    if (this.progressStatus.rect) {
      e.preventDefault();
      this.progressStatus = {
        ...this.progressStatus,
        rect: null
      };
      this.progress.emit(this.progressStatus);
      document.body.style.cursor = 'unset';
    }
  }
  calculateProgress(e, rect) {
    let clientX;
    if (e instanceof TouchEvent) {
      clientX = e.touches[0]?.clientX;
    } else {
      clientX = e.clientX;
    }
    let progress = (clientX - rect.left) / rect.width;
    if (progress < 0) {
      progress = 0;
    } else if (progress > 1) {
      progress = 1;
    }
    return progress;
  }
}
SliderComponent.ɵfac = function SliderComponent_Factory(t) {
  return new (t || SliderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
};
SliderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SliderComponent,
  selectors: [["app-ui-slider"]],
  hostBindings: function SliderComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function SliderComponent_keydown_HostBindingHandler($event) {
        return ctx.handleKeyPress($event);
      })("tap", function SliderComponent_tap_HostBindingHandler($event) {
        return ctx.onTap($event);
      })("panstart", function SliderComponent_panstart_HostBindingHandler($event) {
        return ctx.onMouseDown($event);
      })("wheel", function SliderComponent_wheel_HostBindingHandler($event) {
        return ctx.onWheel($event);
      })("panmove", function SliderComponent_panmove_HostBindingHandler($event) {
        return ctx.documentMouseMove($event);
      })("panend", function SliderComponent_panend_HostBindingHandler($event) {
        return ctx.windowMouseUp($event);
      });
    }
  },
  inputs: {
    ariaLabel: "ariaLabel",
    dragged: "dragged",
    duration: "duration",
    emitSeekOnWheel: "emitSeekOnWheel",
    faded: "faded",
    hasButton: "hasButton",
    scrollGranularity: "scrollGranularity",
    seek: "seek"
  },
  outputs: {
    progress: "progress"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  decls: 4,
  vars: 12,
  consts: [["role", "slider", "aria-orientation", "horizontal", "tabindex", "0", "aria-valuemin", "0", "aria-valuemax", "100", 1, "progress-container", 3, "ngClass"], ["container", ""], [1, "progress", 3, "ngClass"], ["class", "button", 3, "ngClass", "transform", 4, "ngIf"], [1, "button", 3, "ngClass"]],
  template: function SliderComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, SliderComponent_div_3_Template, 1, 5, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](7, _c1, ctx.faded, !!ctx.progressStatus.rect && ctx.wheeling !== -1));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", ctx.ariaLabel)("aria-valuetext", ctx.getAriaValueText(ctx.duration, ctx.progressStatus));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("transform", "scaleX(" + ctx.progressStatus.progress + ")");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](10, _c0, !!ctx.progressStatus.rect));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasButton);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf],
  styles: ["[_nghost-%COMP%] {\n  --this-button-border-style: var(--button-border-style, none);\n  --this-button-border-color: var(--button-border-color, white);\n  --this-button-border-width: var(--button-border-width, 0px);\n  --this-button-color: var(--button-color, white);\n  --this-button-heigth: 8px;\n  --this-color: var(--color, grey);\n  --this-drag-color: var(--drag-color, blue);\n  --this-heigth: 4px;\n  --this-progress-color: var(--progress-color, #FA5485);\n}\n[_nghost-%COMP%]   .progress-container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: var(--this-heigth);\n  margin-top: 4px;\n  border-radius: 10px;\n  background-color: var(--this-color);\n  cursor: pointer;\n}\n[_nghost-%COMP%]   .progress-container.faded[_ngcontent-%COMP%] {\n  background-color: grey;\n}\n[_nghost-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  transform: scaleX(0);\n  transform-origin: left;\n  background-color: var(--this-progress-color);\n  border-radius: 10px;\n}\n[_nghost-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress.dragged[_ngcontent-%COMP%] {\n  background-color: var(--this-drag-color);\n}\n[_nghost-%COMP%]   .progress-container[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n  position: absolute;\n  height: var(--this-button-heigth);\n  width: var(--this-button-heigth);\n  top: calc(var(--this-button-heigth) / -2 + var(--this-heigth) / 2 - var(--this-button-border-width));\n  left: -6px;\n  border-radius: 32px;\n  border-style: var(--this-button-border-style);\n  border-color: var(--this-button-border-color);\n  border-width: var(--this-button-border-width);\n  background-color: var(--this-button-color);\n  cursor: grab;\n}\n[_nghost-%COMP%]   .progress-container[_ngcontent-%COMP%]   .button.grabbing[_ngcontent-%COMP%] {\n  cursor: grabbing;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAtdWkvcHJvZ3Jlc3MtYmFyL3NsaWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDREQUFBO0VBQ0EsNkRBQUE7RUFDQSwyREFBQTtFQUNBLCtDQUFBO0VBQ0EseUJBQUE7RUFDQSxnQ0FBQTtFQUNBLDBDQUFBO0VBQ0Esa0JBQUE7RUFDQSxxREFBQTtBQUNKO0FBQ0k7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSwwQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLG1DQUFBO0VBQ0EsZUFBQTtBQUNSO0FBQ1E7RUFDSSxzQkFBQTtBQUNaO0FBRVE7RUFDSSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUNBLHNCQUFBO0VBQ0EsNENBQUE7RUFDQSxtQkFBQTtBQUFaO0FBRVk7RUFDSSx3Q0FBQTtBQUFoQjtBQUlRO0VBQ0ksa0JBQUE7RUFDQSxpQ0FBQTtFQUNBLGdDQUFBO0VBQ0Esb0dBQUE7RUFDQSxVQUFBO0VBQ0EsbUJBQUE7RUFDQSw2Q0FBQTtFQUNBLDZDQUFBO0VBQ0EsNkNBQUE7RUFDQSwwQ0FBQTtFQUNBLFlBQUE7QUFGWjtBQUlZO0VBQ0ksZ0JBQUE7QUFGaEIiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgLS10aGlzLWJ1dHRvbi1ib3JkZXItc3R5bGU6IHZhcigtLWJ1dHRvbi1ib3JkZXItc3R5bGUsIG5vbmUpO1xuICAgIC0tdGhpcy1idXR0b24tYm9yZGVyLWNvbG9yOiB2YXIoLS1idXR0b24tYm9yZGVyLWNvbG9yLCB3aGl0ZSk7XG4gICAgLS10aGlzLWJ1dHRvbi1ib3JkZXItd2lkdGg6IHZhcigtLWJ1dHRvbi1ib3JkZXItd2lkdGgsIDBweCk7XG4gICAgLS10aGlzLWJ1dHRvbi1jb2xvcjogdmFyKC0tYnV0dG9uLWNvbG9yLCB3aGl0ZSk7XG4gICAgLS10aGlzLWJ1dHRvbi1oZWlndGg6IDhweDtcbiAgICAtLXRoaXMtY29sb3I6IHZhcigtLWNvbG9yLCBncmV5KTtcbiAgICAtLXRoaXMtZHJhZy1jb2xvcjogdmFyKC0tZHJhZy1jb2xvciwgYmx1ZSk7XG4gICAgLS10aGlzLWhlaWd0aDogNHB4O1xuICAgIC0tdGhpcy1wcm9ncmVzcy1jb2xvcjogdmFyKC0tcHJvZ3Jlc3MtY29sb3IsICNGQTU0ODUpO1xuXG4gICAgLnByb2dyZXNzLWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogdmFyKC0tdGhpcy1oZWlndGgpO1xuICAgICAgICBtYXJnaW4tdG9wOiA0cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRoaXMtY29sb3IpO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICAgJi5mYWRlZCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xuICAgICAgICB9XG5cbiAgICAgICAgLnByb2dyZXNzIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGVYKDApO1xuICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRoaXMtcHJvZ3Jlc3MtY29sb3IpO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcblxuICAgICAgICAgICAgJi5kcmFnZ2VkIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10aGlzLWRyYWctY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLmJ1dHRvbiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBoZWlnaHQ6IHZhcigtLXRoaXMtYnV0dG9uLWhlaWd0aCk7XG4gICAgICAgICAgICB3aWR0aDogdmFyKC0tdGhpcy1idXR0b24taGVpZ3RoKTtcbiAgICAgICAgICAgIHRvcDogY2FsYygodmFyKC0tdGhpcy1idXR0b24taGVpZ3RoKSAvIC0yKSArICh2YXIoLS10aGlzLWhlaWd0aCkgLyAyKSAtIHZhcigtLXRoaXMtYnV0dG9uLWJvcmRlci13aWR0aCkpO1xuICAgICAgICAgICAgbGVmdDogLTZweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDMycHg7XG4gICAgICAgICAgICBib3JkZXItc3R5bGU6IHZhcigtLXRoaXMtYnV0dG9uLWJvcmRlci1zdHlsZSk7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLXRoaXMtYnV0dG9uLWJvcmRlci1jb2xvcik7XG4gICAgICAgICAgICBib3JkZXItd2lkdGg6IHZhcigtLXRoaXMtYnV0dG9uLWJvcmRlci13aWR0aCk7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10aGlzLWJ1dHRvbi1jb2xvcik7XG4gICAgICAgICAgICBjdXJzb3I6IGdyYWI7XG5cbiAgICAgICAgICAgICYuZ3JhYmJpbmcge1xuICAgICAgICAgICAgICAgIGN1cnNvcjogZ3JhYmJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
  changeDetection: 0
});

/***/ }),

/***/ 6401:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent),
/* harmony export */   SERVER_URL: () => (/* binding */ SERVER_URL)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 7592);
/* harmony import */ var _track_upload_track_upload_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./track-upload/track-upload.component */ 555);
/* harmony import */ var _model_track__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/track */ 2531);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _audio_player_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./audio-player.service */ 9571);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 4860);









function AppComponent_app_player_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "app-player", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("next", function AppComponent_app_player_0_Template_app_player_next_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r3.onNext($event));
    })("prev", function AppComponent_app_player_0_Template_app_player_prev_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r5.onPrev());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("track", ctx_r0.selectedTrack);
  }
}
function AppComponent_ul_2_li_1_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_ul_2_li_1_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r15);
      const track_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r13.loadTrack(track_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Load");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function AppComponent_ul_2_li_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " (.-.processing.-.)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
}
function AppComponent_ul_2_li_1_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " (-idle-)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
}
function AppComponent_ul_2_li_1_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " (.-queued-.)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
}
function AppComponent_ul_2_li_1_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " (x error x)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
}
const _c0 = function (a0) {
  return {
    active: a0
  };
};
function AppComponent_ul_2_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, AppComponent_ul_2_li_1_button_2_Template, 2, 0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, AppComponent_ul_2_li_1_ng_container_3_Template, 2, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, AppComponent_ul_2_li_1_ng_container_4_Template, 2, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, AppComponent_ul_2_li_1_ng_container_5_Template, 2, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, AppComponent_ul_2_li_1_ng_container_6_Template, 2, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const track_r7 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](8, _c0, track_r7 === ctx_r6.selectedTrack));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"](" ", track_r7.artists.join(", "), " - ", track_r7.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", track_r7.status === ctx_r6.TrackStatus.READY);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", track_r7.status === ctx_r6.TrackStatus.PROCESSING);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", track_r7.status === ctx_r6.TrackStatus.IDLE);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", track_r7.status === ctx_r6.TrackStatus.QUEUED);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", track_r7.status === ctx_r6.TrackStatus.ERROR);
  }
}
function AppComponent_ul_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AppComponent_ul_2_li_1_Template, 7, 10, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_ul_2_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r16.addTrack());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Add");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_ul_2_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r17);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r18.refresh());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Refresh");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.tracks);
  }
}
function AppComponent_p_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "loading...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
const SERVER_URL = 'https://muese.servehttp.com:3000';
class AppComponent {
  constructor(audioPlayerService, dialog, domSanitizer, matIconRegistry, http) {
    this.audioPlayerService = audioPlayerService;
    this.dialog = dialog;
    this.domSanitizer = domSanitizer;
    this.matIconRegistry = matIconRegistry;
    this.http = http;
    this.loading = false;
    this.tracks = [];
    this.TrackStatus = _model_track__WEBPACK_IMPORTED_MODULE_1__.TrackStatus;
    this.matIconRegistry.addSvgIcon(`m`, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/m.svg`));
    this.matIconRegistry.addSvgIcon(`s`, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/s.svg`));
    this.matIconRegistry.addSvgIcon(`drums`, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/drums.svg`));
    this.matIconRegistry.addSvgIcon(`piano`, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/piano.svg`));
    this.matIconRegistry.addSvgIcon(`bass`, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/bass.svg`));
    this.matIconRegistry.addSvgIcon(`vocals`, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/vocals.svg`));
    this.matIconRegistry.addSvgIcon(`other`, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/other.svg`));
  }
  ngOnInit() {
    this.getTracks();
  }
  refresh() {
    this.getTracks();
  }
  loadTrack(track) {
    this.selectedTrack = track;
  }
  onNext(shuffle) {
    let availableTracks = this.getAvailableTracks();
    if (availableTracks.length) {
      let currentIndex = this.selectedTrack ? availableTracks.indexOf(this.selectedTrack) : -1;
      let index = currentIndex;
      if (shuffle) {
        while (index === currentIndex) {
          index = Math.floor(Math.random() * availableTracks.length);
        }
      } else {
        index = (currentIndex + 1) % availableTracks.length;
      }
      this.selectedTrack = availableTracks[index];
    }
  }
  onPrev() {
    let availableTracks = this.getAvailableTracks();
    if (availableTracks.length) {
      let index = this.selectedTrack ? (availableTracks.indexOf(this.selectedTrack) - 1) % availableTracks.length : 0;
      this.selectedTrack = availableTracks[index];
    }
  }
  addTrack() {
    this.dialog.open(_track_upload_track_upload_component__WEBPACK_IMPORTED_MODULE_0__.TrackUploadComponent);
  }
  getAvailableTracks() {
    return this.tracks.filter(track => track.status === _model_track__WEBPACK_IMPORTED_MODULE_1__.TrackStatus.READY);
  }
  getTracks() {
    this.loading = true;
    this.http.get(`${SERVER_URL}/track`).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.delay)(1000)).subscribe(tracks => {
      this.tracks = tracks;
      this.loading = false;
      if (this.selectedTrack) {
        this.selectedTrack = this.tracks.find(track => track.filename === this.selectedTrack?.filename);
      } else {
        let availableTracks = this.getAvailableTracks();
        if (availableTracks.length) {
          this.selectedTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)];
        }
      }
    });
  }
}
AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_audio_player_service__WEBPACK_IMPORTED_MODULE_2__.AudioPlayerService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconRegistry), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient));
};
AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["app-root"]],
  decls: 4,
  vars: 3,
  consts: [[3, "track", "next", "prev", 4, "ngIf"], [1, "list"], [4, "ngIf"], [3, "track", "next", "prev"], [3, "ngClass", 4, "ngFor", "ngForOf"], [3, "click"], [3, "ngClass"], [3, "click", 4, "ngIf"]],
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, AppComponent_app_player_0_Template, 1, 1, "app-player", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, AppComponent_ul_2_Template, 6, 1, "ul", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, AppComponent_p_3_Template, 2, 0, "p", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.selectedTrack);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loading);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.loading);
    }
  },
  styles: ["[_nghost-%COMP%] {\n  height: 100vh;\n  display: flex;\n  flex-direction: row;\n}\n[_nghost-%COMP%]   app-player[_ngcontent-%COMP%] {\n  height: 100%;\n  flex: auto 1 0;\n}\n[_nghost-%COMP%]   .list[_ngcontent-%COMP%] {\n  flex: 400px 0 0;\n}\n[_nghost-%COMP%]   .list[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%] {\n  color: red;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBQUNKO0FBQ0k7RUFDSSxZQUFBO0VBQ0EsY0FBQTtBQUNSO0FBRUk7RUFDSSxlQUFBO0FBQVI7QUFFUTtFQUNJLFVBQUE7QUFBWiIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcblxuICAgIGFwcC1wbGF5ZXIge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGZsZXg6IGF1dG8gMSAwO1xuICAgIH1cblxuICAgIC5saXN0IHtcbiAgICAgICAgZmxleDogNDAwcHggMCAwO1xuXG4gICAgICAgIGxpLmFjdGl2ZSB7XG4gICAgICAgICAgICBjb2xvcjogcmVkO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 8629:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule),
/* harmony export */   musicalChordNames: () => (/* binding */ musicalChordNames)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 6401);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _player_player_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player/player.component */ 7105);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ 4987);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _app_ui_app_ui_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app-ui/app-ui.module */ 2304);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/tooltip */ 702);
/* harmony import */ var _audio_player_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./audio-player.service */ 9571);
/* harmony import */ var _player_stem_player_stem_player_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player/stem-player/stem-player.component */ 7308);
/* harmony import */ var _track_upload_track_upload_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./track-upload/track-upload.component */ 555);
/* harmony import */ var ngx_scrollbar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-scrollbar */ 139);
/* harmony import */ var _app_ui_balance_button_balance_button_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../app-ui/balance-button/balance-button.component */ 2856);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _app_ui_progress_bar_slider_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../app-ui/progress-bar/slider.component */ 7830);






















class AppModule {}
AppModule.ɵfac = function AppModule_Factory(t) {
  return new (t || AppModule)();
};
AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
  type: AppModule,
  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
});
AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
  providers: [_audio_player_service__WEBPACK_IMPORTED_MODULE_3__.AudioPlayerService],
  imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.HammerModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClientModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__.MatDialogModule, ngx_scrollbar__WEBPACK_IMPORTED_MODULE_13__.NgScrollbarModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormsModule, _app_ui_app_ui_module__WEBPACK_IMPORTED_MODULE_2__.AppUiModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIconModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__.MatTooltipModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, _player_player_component__WEBPACK_IMPORTED_MODULE_1__.PlayerComponent, _track_upload_track_upload_component__WEBPACK_IMPORTED_MODULE_5__.TrackUploadComponent, _player_stem_player_stem_player_component__WEBPACK_IMPORTED_MODULE_4__.StemPlayerComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.HammerModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClientModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__.MatDialogModule, ngx_scrollbar__WEBPACK_IMPORTED_MODULE_13__.NgScrollbarModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormsModule, _app_ui_app_ui_module__WEBPACK_IMPORTED_MODULE_2__.AppUiModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIconModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__.MatTooltipModule, _app_ui_balance_button_balance_button_component__WEBPACK_IMPORTED_MODULE_6__.BalanceButtonComponent]
  });
})();
_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetComponentScope"](_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, [_angular_common__WEBPACK_IMPORTED_MODULE_18__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgIf, _player_player_component__WEBPACK_IMPORTED_MODULE_1__.PlayerComponent], []);
_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetComponentScope"](_player_player_component__WEBPACK_IMPORTED_MODULE_1__.PlayerComponent, [_angular_common__WEBPACK_IMPORTED_MODULE_18__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgTemplateOutlet, ngx_scrollbar__WEBPACK_IMPORTED_MODULE_13__.NgScrollbar, _app_ui_progress_bar_slider_component__WEBPACK_IMPORTED_MODULE_7__.SliderComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatIconButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatFabButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIcon, _player_stem_player_stem_player_component__WEBPACK_IMPORTED_MODULE_4__.StemPlayerComponent], [_angular_common__WEBPACK_IMPORTED_MODULE_18__.DatePipe]);
const musicalChordNames = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "Am", "A#m", "Bm", "Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m" /// minor
];

let camelotChordNames = ["11B", "6B", "1B", "8B", "3B", "10B", "5B", "12B", "7B", "2B", "9B", "4B", "8A", "3A", "10A", "5A", "12A", "7A", "2A", "9A", "4A", "11A", "6A", "1A" /// minor
];

let openkeyChordNames = ["4d", "11d", "6d", "1d", "8d", "3d", "10d", "5d", "12d", "7d", "2d", "9d", "1m", "8m", "3m", "10m", "5m", "12m", "7m", "2m", "9m", "4m", "11m", "6m" /// minor
];

/***/ }),

/***/ 9571:
/*!*****************************************!*\
  !*** ./src/app/audio-player.service.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AudioPlayerService: () => (/* binding */ AudioPlayerService)
/* harmony export */ });
/* harmony import */ var _home_runner_work_muese_client_muese_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _assets_scripts_Superpowered_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/scripts/Superpowered.js */ 2907);
/* harmony import */ var _assets_scripts_Superpowered_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_scripts_Superpowered_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5400);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 331);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 5267);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 274);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 4520);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 1891);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 1699);

// @ts-ignored





class AudioPlayerService {
  constructor(httpClient, rendererFactory) {
    this.httpClient = httpClient;
    this.rendererFactory = rendererFactory;
    this.duration = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    this.progress = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    this.end = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    this.initSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__.ReplaySubject();
    this.loadingSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    this.messageSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    const renderer = this.rendererFactory.createRenderer(null, null);
    const unlisten = renderer.listen('document', "click", () => {
      unlisten();
      this.loadSuperPowered().then(() => this.initSubject.next());
    });
    this.messageSubject.subscribe(message => {
      switch (message.type) {
        case 'duration':
          this.duration.next(message.duration);
          break;
        case 'end':
          this.end.next();
          break;
        case 'progress':
          this.progress.next(message.progress);
          break;
      }
    });
  }
  /*
  ** Service methods
  */
  getAudioContext() {
    return this.webaudioManager?.audioContext;
  }
  isInitialized() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.firstValueFrom)(this.initSubject);
  }
  /*
  ** Player Commands
  */
  create(name = 'pop') {
    const type = 'create';
    this.playerProcessor?.sendMessageToAudioScope({
      type,
      name
    });
    return new Promise((resolve, reject) => {
      this.messageSubject.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.first)(value => value.type === type && value.name === name)).subscribe(msg => !msg.error ? resolve() : reject());
    });
  }
  finish() {
    this.playerProcessor?.sendMessageToAudioScope({
      type: 'finish'
    });
  }
  loadFromUrl(name, url) {
    var _this = this;
    this.loadingSubject.next(name);
    return this.httpClient.get(url, {
      observe: 'events',
      reportProgress: true,
      responseType: 'blob'
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this.loadingSubject.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(n => n === name))), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.switchMap)( /*#__PURE__*/function () {
      var _ref = (0,_home_runner_work_muese_client_muese_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (event) {
        if (event.type == _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpEventType.DownloadProgress) {
          return {
            type: event.type,
            progress: event.total ? event.loaded / event.total : 0
          };
        } else if (event.type == _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpEventType.Response) {
          let blob = event.body;
          if (blob) {
            const arrayBuffer = yield blob.arrayBuffer();
            yield _this.load(name, arrayBuffer);
            _this.progress.next(0);
            return {
              type: _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpEventType.Response,
              arrayBuffer
            };
          } else {
            throw new Error('File is empty');
          }
        } else {
          return {
            type: event.type
          };
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()));
  }
  load(name, arrayBuffer) {
    const type = 'load';
    return new Promise((resolve, reject) => {
      this.playerProcessor?.sendMessageToAudioScope({
        name,
        type,
        arrayBuffer
      });
      this.messageSubject.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.first)(msg => msg.type === type && msg.name === name)).subscribe(msg => msg.success ? resolve(msg.analysis) : reject());
    });
  }
  mute(name, muted) {
    this.playerProcessor?.sendMessageToAudioScope({
      type: 'mute',
      name,
      muted
    });
  }
  pause() {
    this.playerProcessor?.sendMessageToAudioScope({
      type: 'pause'
    });
  }
  play(progress = null) {
    this.playerProcessor?.sendMessageToAudioScope({
      type: 'play',
      progress: progress
    });
  }
  seek(progress) {
    this.playerProcessor?.sendMessageToAudioScope({
      type: 'seek',
      progress
    });
  }
  setBalance(name, balance) {
    this.playerProcessor?.sendMessageToAudioScope({
      type: 'setBalance',
      name,
      balance
    });
  }
  /*
  ** setPitch
  ** pitch: cents of half-tone (1 Octave = 1200) {-2400:2400} - use multiple of 100 for better performance
  */
  setPitch(pitch) {
    if (pitch > 2400) pitch = 2400;
    if (pitch < -2400) pitch = 2400;
    this.playerProcessor?.sendMessageToAudioScope({
      type: 'setPitch',
      pitch
    });
  }
  setSpeed(speed) {
    this.playerProcessor?.sendMessageToAudioScope({
      type: 'setSpeed',
      speed: speed > 0.00001 ? speed : 0.00001
    });
  }
  setVolume(volume, name) {
    this.playerProcessor?.sendMessageToAudioScope({
      type: 'setVolume',
      name,
      volume
    });
  }
  /*
  ** Private
  */
  loadSuperPowered() {
    var _this2 = this;
    return (0,_home_runner_work_muese_client_muese_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // @ts-ignored
      _this2.superpowered = yield SuperpoweredGlue.Instantiate('ExampleLicenseKey-WillExpire-OnNextUpdate', 'assets/scripts/Superpowered.js');
      console.log(`Running Superpowered v${_this2.superpowered.Version()}`);
      console.log(_this2.superpowered);
      _this2.webaudioManager = new _assets_scripts_Superpowered_js__WEBPACK_IMPORTED_MODULE_1__.SuperpoweredWebAudio(44100, _this2.superpowered);
      console.log(_this2.webaudioManager);
      _this2.playerProcessor = yield _this2.webaudioManager.createAudioNodeAsync('assets/scripts/my-player.js', 'MyPlayer', msg => _this2.messageSubject.next(msg));
      _this2.playerProcessor.connect(_this2.webaudioManager.audioContext.destination);
    })();
  }
}
AudioPlayerService.ɵfac = function AudioPlayerService_Factory(t) {
  return new (t || AudioPlayerService)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.RendererFactory2));
};
AudioPlayerService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({
  token: AudioPlayerService,
  factory: AudioPlayerService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 7105:
/*!********************************************!*\
  !*** ./src/app/player/player.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlayerComponent: () => (/* binding */ PlayerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _stem_player_stem_player_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stem-player/stem-player.component */ 7308);
/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.module */ 8629);
/* harmony import */ var _model_stem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../model/stem */ 4232);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../app.component */ 6401);
/* harmony import */ var _audio_player_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../audio-player.service */ 9571);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ 7401);








function PlayerComponent_ng_template_12_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PlayerComponent_ng_template_12_button_4_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r12);
      const label_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().label;
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r10.onButtonClick(label_r3, -1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "remove");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const disableMinButton_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().disableMinButton;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", disableMinButton_r5);
  }
}
function PlayerComponent_ng_template_12_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PlayerComponent_ng_template_12_button_8_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r16);
      const label_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().label;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r14.onButtonClick(label_r3, 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "add");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const disablePlusButton_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().disablePlusButton;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", disablePlusButton_r6);
  }
}
function PlayerComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 27)(1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, PlayerComponent_ng_template_12_button_4_Template, 3, 1, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 31)(6, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, PlayerComponent_ng_template_12_button_8_Template, 3, 1, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PlayerComponent_ng_template_12_Template_div_click_9_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r19);
      const label_r3 = restoredCtx.label;
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r18.onReset(label_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "reset");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const label_r3 = ctx.label;
    const showButtons_r4 = ctx.showButtons;
    const value_r7 = ctx.value;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](label_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", showButtons_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](value_r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", showButtons_r4);
  }
}
function PlayerComponent_app_stem_player_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-stem-player", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("dragStatus", function PlayerComponent_app_stem_player_52_Template_app_stem_player_dragStatus_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r21.onDragEvent($event));
    })("loaded", function PlayerComponent_app_stem_player_52_Template_app_stem_player_loaded_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r22);
      const key_r20 = restoredCtx.$implicit;
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r23.onTrackLoaded(key_r20));
    })("progressChange", function PlayerComponent_app_stem_player_52_Template_app_stem_player_progressChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r22);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r24.onProgressChange($event));
    })("clickSolo", function PlayerComponent_app_stem_player_52_Template_app_stem_player_clickSolo_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r22);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r25.onSolo($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const key_r20 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dragData", ctx_r2.dragData)("iconName", ctx_r2.stemPlayers[key_r20].iconName)("progress", ctx_r2.progress)("soloMode", ctx_r2.soloMode)("stem", ctx_r2.stemPlayers[key_r20].stem)("title", key_r20)("trackFilename", (ctx_r2.track == null ? null : ctx_r2.track.filename) || "");
  }
}
const _c0 = function (a0, a1, a4) {
  return {
    disableMinButton: a0,
    disablePlusButton: a1,
    label: "BPM",
    showButtons: true,
    value: a4
  };
};
const _c1 = function (a0, a1, a4) {
  return {
    disableMinButton: a0,
    disablePlusButton: a1,
    label: "Key",
    showButtons: true,
    value: a4
  };
};
const _c2 = function (a0) {
  return {
    active: a0
  };
};
class PlayerComponent {
  constructor(audioPlayer, changeDetectorRef, elementRef, matDialog) {
    this.audioPlayer = audioPlayer;
    this.changeDetectorRef = changeDetectorRef;
    this.elementRef = elementRef;
    this.matDialog = matDialog;
    this.PITCH_MIN = -12;
    this.PITCH_MAX = 12;
    this.SPEED_MIN = 0.5;
    this.SPEED_MAX = 2;
    this.stemPlayerComponents = [];
    this.next = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.prev = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.albumDisplay = '';
    this.autoplay = false;
    this.bpmDisplay = '';
    this.coverUrl = PlayerComponent.DEFAULT_COVER_URL;
    this.dragData = null;
    this.duration = 0;
    this.loopActivated = false;
    this.paused = true;
    this.pitchDisplay = '';
    this.progress = 0;
    this.ready = false;
    this.soloMode = [];
    this.shuffleActivated = false;
    this.speed = PlayerComponent.DEFAULT_SPEED;
    this.volume = PlayerComponent.DEFAULT_VOLUME;
    this.pitch = PlayerComponent.DEFAULT_PITCH;
    this.stemPlayers = {
      Drums: {
        iconName: 'drums'
      },
      Piano: {
        iconName: 'piano'
      },
      Bass: {
        iconName: 'bass'
      },
      Vocals: {
        iconName: 'vocals'
      },
      Other: {
        iconName: 'other'
      }
    };
    this.Object = Object;
    this.setVolume(this.volume);
    this.audioPlayer.duration.subscribe(duration => this.duration = duration);
    this.audioPlayer.progress.subscribe(progress => {
      this.progress = progress;
      this.changeDetectorRef.detectChanges();
    });
    this.audioPlayer.end.subscribe(() => {
      if (this.loopActivated) {
        this.play(0);
      } else {
        this.paused = true;
        this.next.emit(this.shuffleActivated);
      }
    });
    this.audioPlayer.isInitialized().then(() => {
      for (let key of Object.keys(this.stemPlayers)) {
        this.audioPlayer.create(key);
      }
    });
  }
  ngOnChanges(changes) {
    if (changes['track']) {
      this.albumDisplay = this.track?.albums ? this.track.albums.map(album => album.name).join(', ') : '';
      this.coverUrl = this.track?.albums && this.track.albums[0].cover ? `url(${_app_component__WEBPACK_IMPORTED_MODULE_3__.SERVER_URL}/music/covers/${this.track.albums[0].cover})` : 'url(/assets/img/nopic.svg)';
      this.duration = 0;
      this.paused = true;
      this.progress = 0;
      this.ready = false;
      this.soloMode = [];
      for (let key of Object.keys(this.stemPlayers)) {
        let stem;
        if (this.track) {
          stem = this.track.stems.find(stem => stem.type === PlayerComponent.getStemType(key));
        }
        this.stemPlayers[key] = {
          ...this.stemPlayers[key],
          loaded: false,
          stem
        };
      }
      this.setSpeed(PlayerComponent.DEFAULT_SPEED);
      this.setPitch(PlayerComponent.DEFAULT_PITCH);
      this.audioPlayer.finish();
    }
  }
  onDragEvent(dragData) {
    this.dragData = dragData;
  }
  onNext() {
    this.autoplay = !this.paused;
    this.paused = true;
    this.next.emit(this.shuffleActivated);
  }
  onPrev() {
    if (this.duration / this.progress > 1) {
      this.seek(0);
    } else {
      this.prev.emit();
    }
  }
  onProgressBarChange(progressStatus) {
    if (progressStatus.rect) {
      this.dragData = {
        rect: progressStatus.rect,
        progress: progressStatus.progress,
        origin: null
      };
    } else {
      this.dragData = null;
      this.seek(progressStatus.progress);
    }
  }
  onSolo(stem) {
    // for (let stemPlayerComponent of this.stemPlayerComponents) {
    //     stemPlayerComponent.mute(stem !== stemPlayerComponent);
    // }
    if (this.soloMode.find(s => s === stem)) {
      this.soloMode = this.soloMode.filter(s => s != stem);
    } else {
      this.soloMode = [...this.soloMode, stem];
    }
  }
  onButtonClick(type, direction) {
    switch (type) {
      case 'BPM':
        this.onBPMChange(direction);
        break;
      case 'Key':
        this.onPitchChange(direction);
    }
  }
  onBPMChange(direction) {
    let granularity;
    if (this.track && this.track.bpm >= 0) {
      let bpmMin = this.track?.bpm * 0.5;
      let bpmMax = this.track?.bpm * 4;
      granularity = 3.5 / (bpmMax - bpmMin);
    } else {
      granularity = 0.05;
    }
    this.setSpeed(this.speed + granularity * direction);
  }
  onPitchChange(direction) {
    this.setPitch(this.pitch + direction);
  }
  onProgressChange(progress) {
    this.seek(progress);
  }
  onReset(type) {
    switch (type) {
      case 'BPM':
        this.setSpeed(PlayerComponent.DEFAULT_SPEED);
        break;
      case 'Key':
        this.setPitch(PlayerComponent.DEFAULT_PITCH);
    }
  }
  onTrackLoaded(stemName) {
    this.stemPlayers[stemName].loaded = true;
    this.ready = Object.values(this.stemPlayers).every(player => player.loaded);
    if (this.ready && this.autoplay) {
      this.autoplay = false;
      this.play(0);
    }
  }
  onVolumeProgress(volumeStatus) {
    this.setVolume(volumeStatus.progress);
  }
  playPause() {
    if (this.ready)
      //TODO we could used a timed play if sync issues
      this.paused ? this.play() : this.pause();
  }
  // Private
  handleKeyPress(e) {
    if (e.code == 'Space' && document.getElementById('play-button') !== document.activeElement && !this.matDialog.openDialogs.length) {
      e.preventDefault();
      this.playPause();
    }
  }
  static getStemType(stemName) {
    let type;
    switch (stemName) {
      case 'Drums':
        type = _model_stem__WEBPACK_IMPORTED_MODULE_2__.StemType.DRUMS;
        break;
      case 'Piano':
        type = _model_stem__WEBPACK_IMPORTED_MODULE_2__.StemType.PIANO;
        break;
      case 'Bass':
        type = _model_stem__WEBPACK_IMPORTED_MODULE_2__.StemType.BASS;
        break;
      case 'Vocals':
        type = _model_stem__WEBPACK_IMPORTED_MODULE_2__.StemType.VOCALS;
        break;
      case 'Other':
        type = _model_stem__WEBPACK_IMPORTED_MODULE_2__.StemType.OTHER;
        break;
      default:
        return undefined;
    }
    return type;
  }
  seek(progress) {
    this.progress = progress;
    this.audioPlayer.seek(progress);
  }
  setPitch(pitch) {
    this.pitch = pitch;
    this.audioPlayer.setPitch(pitch * 100);
    if (this.track && this.track.key !== -1) {
      let index = ((this.track.key + this.pitch) % 12 + 12) % 12;
      this.pitchDisplay = _app_module__WEBPACK_IMPORTED_MODULE_1__.musicalChordNames[index];
    } else {
      this.pitchDisplay = this.pitch.toString();
    }
  }
  setSpeed(speed) {
    this.speed = speed;
    this.audioPlayer.setSpeed(speed);
    const bpm = this.track ? this.track.bpm : -1;
    switch (bpm) {
      case -2:
        this.bpmDisplay = '??';
        break;
      case -1:
        this.bpmDisplay = this.speed.toFixed(2) + 'x';
        break;
      default:
        this.bpmDisplay = Math.round(bpm * this.speed).toString();
    }
  }
  play(progress) {
    this.paused = false;
    this.audioPlayer.play(progress);
  }
  pause() {
    this.paused = true;
    this.audioPlayer.pause();
  }
  setVolume(volume) {
    this.volume = volume;
    this.audioPlayer.setVolume(volume);
  }
}
PlayerComponent.DEFAULT_COVER_URL = '/assets/img/nopic.svg';
PlayerComponent.DEFAULT_PITCH = 0;
PlayerComponent.DEFAULT_SPEED = 1;
PlayerComponent.DEFAULT_VOLUME = 0.75;
PlayerComponent.ɵfac = function PlayerComponent_Factory(t) {
  return new (t || PlayerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_audio_player_service__WEBPACK_IMPORTED_MODULE_4__.AudioPlayerService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialog));
};
PlayerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: PlayerComponent,
  selectors: [["app-player"]],
  viewQuery: function PlayerComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_stem_player_stem_player_component__WEBPACK_IMPORTED_MODULE_0__.StemPlayerComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.stemPlayerComponents = _t);
    }
  },
  hostBindings: function PlayerComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("keydown", function PlayerComponent_keydown_HostBindingHandler($event) {
        return ctx.handleKeyPress($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresolveDocument"]);
    }
  },
  inputs: {
    track: "track"
  },
  outputs: {
    next: "next",
    prev: "prev"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵNgOnChangesFeature"]],
  decls: 53,
  vars: 44,
  consts: [[1, "player"], [1, "info"], [1, "cover"], [1, "content"], [1, "main"], [1, "title"], [1, "artist"], [1, "album"], [1, "detail"], ["trackDetail", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "commands"], [1, "buttons"], [1, "activable"], ["mat-icon-button", "", "disabled", ""], ["mat-icon-button", "", 3, "ngClass", "click"], [1, "clickable"], ["mat-icon-button", "", 3, "click"], ["mat-fab", "", "id", "play-button", "aria-label", "Play button", 3, "disabled", "click"], [1, "volume"], [3, "ariaLabel", "emitSeekOnWheel", "hasButton", "seek", "progress"], [1, "progress"], [1, "timer"], [3, "ariaLabel", "hasButton", "scrollGranularity", "seek", "duration", "progress"], [3, "autoHeightDisabled"], [1, "tracks"], [3, "dragData", "iconName", "progress", "soloMode", "stem", "title", "trackFilename", "dragStatus", "loaded", "progressChange", "clickSolo", 4, "ngFor", "ngForOf"], [1, "track-detail"], [1, "label"], [1, "value-wrapper"], ["class", "btn-min", "mat-icon-button", "", 3, "disabled", "click", 4, "ngIf"], [1, "value"], [1, "text"], ["class", "btn-plus", "mat-icon-button", "", 3, "disabled", "click", 4, "ngIf"], [1, "reset", 3, "click"], ["mat-icon-button", "", 1, "btn-min", 3, "disabled", "click"], ["mat-icon-button", "", 1, "btn-plus", 3, "disabled", "click"], [3, "dragData", "iconName", "progress", "soloMode", "stem", "title", "trackFilename", "dragStatus", "loaded", "progressChange", "clickSolo"]],
  template: function PlayerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 3)(4, "div", 4)(5, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, PlayerComponent_ng_template_12_Template, 11, 4, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainer"](14, 10)(15, 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "div", 11)(17, "div", 12)(18, "div", 13)(19, "button", 14)(20, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, "text_fields");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "button", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_22_listener() {
        return ctx.loopActivated = !ctx.loopActivated;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24, "loop");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "button", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_25_listener() {
        return ctx.shuffleActivated = !ctx.shuffleActivated;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](27, "shuffle");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "div", 16)(29, "button", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_29_listener() {
        return ctx.onPrev();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](31, "skip_previous");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "button", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_32_listener() {
        return ctx.playPause();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](34);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](35, "button", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_35_listener() {
        return ctx.onNext();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](36, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](37, "skip_next");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](38, "div", 19)(39, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](40, "speaker");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](41, "app-ui-slider", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("progress", function PlayerComponent_Template_app_ui_slider_progress_41_listener($event) {
        return ctx.onVolumeProgress($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](42, "div", 21)(43, "div", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](44);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](45, "date");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](46, "app-ui-slider", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("progress", function PlayerComponent_Template_app_ui_slider_progress_46_listener($event) {
        return ctx.onProgressBarChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](47, "div", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](48);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](49, "date");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](50, "ng-scrollbar", 24)(51, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](52, PlayerComponent_app_stem_player_52_Template, 1, 7, "app-stem-player", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("background-image", ctx.coverUrl);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.track == null ? null : ctx.track.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.track == null ? null : ctx.track.artists == null ? null : ctx.track.artists.join(", "));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.albumDisplay);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngTemplateOutlet", _r0)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction3"](32, _c0, ctx.speed <= ctx.SPEED_MIN, ctx.speed >= ctx.SPEED_MAX, ctx.bpmDisplay));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngTemplateOutlet", _r0)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction3"](36, _c1, ctx.pitch <= ctx.PITCH_MIN, ctx.pitch >= ctx.PITCH_MAX, ctx.pitchDisplay));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](40, _c2, ctx.loopActivated));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](42, _c2, ctx.shuffleActivated));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx.ready);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.paused ? "play_arrow" : "pause");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ariaLabel", "Main volume")("emitSeekOnWheel", true)("hasButton", true)("seek", ctx.volume);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](45, 26, ctx.duration * ctx.progress / ctx.speed, "mm:ss"));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ariaLabel", "Track progress slider")("hasButton", true)("scrollGranularity", ctx.duration ? 1000 / ctx.duration * 5 : 0)("seek", ctx.dragData ? ctx.dragData.progress : ctx.progress)("duration", (ctx.track == null ? null : ctx.track.duration) || 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](49, 29, ctx.duration / ctx.speed, "mm:ss"));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("autoHeightDisabled", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.Object.keys(ctx.stemPlayers));
    }
  },
  styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  width: 636px;\n  height: 100%;\n  min-width: 636px;\n  background-color: #F2F2F2;\n  font-family: \"Noah\", serif;\n  overflow: hidden;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%] {\n  width: 100%;\n  \n\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 0;\n  gap: 24px;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%] {\n  height: 180px;\n  \n\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  padding: 0;\n  gap: 20px;\n  \n\n  flex: none;\n  order: 0;\n  align-self: stretch;\n  flex-grow: 0;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .cover[_ngcontent-%COMP%] {\n  width: 160px;\n  height: 180px;\n  background-size: cover;\n  background-position: center;\n  \n\n  flex: none;\n  order: 0;\n  flex-grow: 0;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {\n  width: 100%;\n  \n\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 16px 0 0;\n  gap: 4px;\n  \n\n  flex: none;\n  order: 1;\n  flex-grow: 1;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%] {\n  width: 456px;\n  height: 80px;\n  color: #0D0D0D;\n  \n\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 0px 20px 0px 0px;\n  gap: 4px;\n  \n\n  flex: none;\n  order: 0;\n  align-self: stretch;\n  flex-grow: 1;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 25px;\n  font-weight: 700;\n  font-size: 20px;\n  line-height: 25px;\n  \n\n  \n\n  flex: none;\n  order: 0;\n  align-self: stretch;\n  flex-grow: 0;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .artist[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 22px;\n  font-weight: 700;\n  font-size: 16px;\n  line-height: 20px;\n  \n\n  flex: none;\n  order: 1;\n  align-self: stretch;\n  flex-grow: 0;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .album[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 22px;\n  font-weight: 400;\n  font-size: 16px;\n  line-height: 20px;\n  \n\n  flex: none;\n  order: 2;\n  align-self: stretch;\n  flex-grow: 0;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%] {\n  width: 100%;\n  \n\n  display: flex;\n  flex-direction: row;\n  align-items: flex-end;\n  padding: 0px;\n  gap: 24px;\n  \n\n  flex: none;\n  order: 1;\n  align-self: stretch;\n  flex-grow: 1;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%] {\n  \n\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  align-items: flex-start;\n  padding: 0;\n  gap: 2px;\n  \n\n  flex: none;\n  align-self: stretch;\n  flex-grow: 0;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 15px;\n  text-align: center;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 12px;\n  line-height: 15px;\n  \n\n  \n\n  flex: none;\n  flex-grow: 0;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%]   .value-wrapper[_ngcontent-%COMP%] {\n  \n\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 0;\n  gap: 4px;\n  \n\n  flex: none;\n  flex-grow: 0;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%]   .value-wrapper[_ngcontent-%COMP%]   .btn-min[_ngcontent-%COMP%], [_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%]   .value-wrapper[_ngcontent-%COMP%]   .btn-plus[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  padding: 0;\n  background: #5D5FEF;\n  color: #FFFFFF;\n  \n\n  flex: none;\n  flex-grow: 0;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%]   .value-wrapper[_ngcontent-%COMP%]   .btn-min[disabled][_ngcontent-%COMP%], [_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%]   .value-wrapper[_ngcontent-%COMP%]   .btn-plus[disabled][_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: 1px solid black;\n  color: black;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%]   .value-wrapper[_ngcontent-%COMP%]   .btn-min[disabled][_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], [_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%]   .value-wrapper[_ngcontent-%COMP%]   .btn-plus[disabled][_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%] {\n  margin: -1px 0 0 -1px;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%]   .value-wrapper[_ngcontent-%COMP%]   .btn-min[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], [_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%]   .value-wrapper[_ngcontent-%COMP%]   .btn-plus[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%] {\n  transform: scale(0.66);\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%]   .value-wrapper[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  width: 47px;\n  height: 36px;\n  box-sizing: border-box;\n  background: #FFFFFF;\n  border-radius: 8px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%]   .value-wrapper[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {\n  height: 20px;\n  margin: 0 auto;\n  font-style: normal;\n  font-weight: 400;\n  font-size: 16px;\n  line-height: 20px;\n  \n\n  text-align: center;\n  \n\n  color: #0D0D0D;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .track-detail[_ngcontent-%COMP%]   .reset[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 15px;\n  cursor: pointer;\n  text-align: center;\n  font-style: normal;\n  font-weight: 400;\n  font-size: 12px;\n  line-height: 15px;\n  \n\n  \n\n  flex: none;\n  flex-grow: 0;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 76px;\n  box-sizing: border-box;\n  \n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 0 16px;\n  gap: 12px;\n  \n\n  flex: none;\n  order: 1;\n  align-self: stretch;\n  flex-grow: 0;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 48px;\n  box-sizing: border-box;\n  \n\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 44px;\n  gap: 38px;\n  \n\n  flex: none;\n  order: 0;\n  align-self: stretch;\n  flex-grow: 0;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   button[disabled][_ngcontent-%COMP%] {\n  color: lightgrey;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]     [mat-icon-button] {\n  width: 30px;\n  height: 30px;\n  padding: 3px;\n  --mat-mdc-button-persistent-ripple-color: grey;\n  --mat-mdc-button-ripple-color: rgba(128, 128, 128, 0.1);\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]     [mat-icon-button] .mat-mdc-button-touch-target {\n  width: 100%;\n  height: 100%;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   .activable[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%] {\n  color: #5D5FEF;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   .clickable[_ngcontent-%COMP%]   #play-button[_ngcontent-%COMP%] {\n  background-color: transparent;\n  color: black;\n  box-shadow: none;\n  border: 2px solid #0D0D0D;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   .clickable[_ngcontent-%COMP%]   #play-button[disabled][_ngcontent-%COMP%] {\n  color: grey;\n  border-color: grey;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   .volume[_ngcontent-%COMP%] {\n  \n\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: center;\n  padding: 0;\n  gap: 8px;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   .volume[_ngcontent-%COMP%]   app-ui-slider[_ngcontent-%COMP%] {\n  display: block;\n  width: 100px;\n  --color: #A5A6F6;\n  --button-color: #5D5FEF;\n  --drag-color: #5D5FEF;\n  --progress-color: #5D5FEF;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 16px;\n  box-sizing: border-box;\n  \n\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  padding: 0 16px;\n  gap: 12px;\n  \n\n  flex: none;\n  order: 1;\n  align-self: stretch;\n  flex-grow: 0;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%]   .timer[_ngcontent-%COMP%] {\n  width: 37px;\n  font-weight: 700;\n}\n[_nghost-%COMP%]   .player[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%]   app-ui-slider[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  --color: #DAC4CF;\n  --drag-color: #f32071;\n  --button-color: #FA5485;\n  --button-border-style: solid;\n  --button-border-color: #EAEEF4;\n  --button-border-width: 2px;\n  flex: none;\n  flex-grow: 1;\n}\n[_nghost-%COMP%]   ng-scrollbar[_ngcontent-%COMP%] {\n  width: 100%;\n}\n[_nghost-%COMP%]   .tracks[_ngcontent-%COMP%] {\n  width: 100%;\n  overflow: auto;\n  -ms-overflow-style: none; \n\n  scrollbar-width: none; \n\n  \n\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 24px;\n  gap: 24px;\n  box-sizing: border-box;\n  \n\n  flex: auto;\n  flex-shrink: 1;\n  order: 2;\n}\n[_nghost-%COMP%]   .tracks[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n[_nghost-%COMP%]   .tracks[_ngcontent-%COMP%]   app-stem-player[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxheWVyL3BsYXllci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EsMEJBQUE7RUFDQSxnQkFBQTtBQUNKO0FBQ0k7RUFDSSxXQUFBO0VBRUEsZ0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0FBQVI7QUFFUTtFQUNJLGFBQUE7RUFFQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFFQSx1QkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBRlo7QUFJWTtFQUNJLFlBQUE7RUFDQSxhQUFBO0VBRUEsc0JBQUE7RUFDQSwyQkFBQTtFQUVBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0FBSmhCO0FBT1k7RUFDSSxXQUFBO0VBRUEsZ0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0VBQ0EsUUFBQTtFQUVBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0FBUGhCO0FBU2dCO0VBQ0ksWUFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBRUEsZ0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLHlCQUFBO0VBQ0EsUUFBQTtFQUVBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFUcEI7QUFXb0I7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUVBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsNEJBQUE7RUFFQSx1QkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBWHhCO0FBY29CO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFFQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUVBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFkeEI7QUFpQm9CO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFFQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUVBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFqQnhCO0FBcUJnQjtFQUNJLFdBQUE7RUFFQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7RUFFQSx1QkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBckJwQjtBQXVCb0I7RUFDSSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsdUJBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUVBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQXRCeEI7QUF3QndCO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFFQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSw0QkFBQTtFQUVBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7QUF4QjVCO0FBMkJ3QjtFQUNJLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUVBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7QUExQjVCO0FBNEI0QjtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUVBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7QUEzQmhDO0FBNkJnQztFQUNJLDZCQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0FBM0JwQztBQTZCb0M7RUFDSSxxQkFBQTtBQTNCeEM7QUErQmdDO0VBQ0ksc0JBQUE7QUE3QnBDO0FBaUM0QjtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBRUEsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFoQ2hDO0FBa0NnQztFQUNJLFlBQUE7RUFDQSxjQUFBO0VBRUEsa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLDRCQUFBO0VBRUEsa0JBQUE7RUFFQSxrQkFBQTtFQUVBLGNBQUE7QUFwQ3BDO0FBeUN3QjtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUVBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLDRCQUFBO0VBRUEsdUJBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtBQXpDNUI7QUFnRFE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0VBRUEsZ0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0VBRUEsdUJBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQWhEWjtBQWtEWTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7RUFFQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtFQUVBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFsRGhCO0FBb0RnQjtFQUNJLGdCQUFBO0FBbERwQjtBQXFEZ0I7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSw4Q0FBQTtFQUNBLHVEQUFBO0FBbkRwQjtBQXFEb0I7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQW5EeEI7QUF3RG9CO0VBQ0ksY0FBQTtBQXREeEI7QUE0RG9CO0VBQ0ksNkJBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtBQTFEeEI7QUE0RHdCO0VBQ0ksV0FBQTtFQUNBLGtCQUFBO0FBMUQ1QjtBQStEZ0I7RUFDSSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtBQTdEcEI7QUErRG9CO0VBQ0ksY0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EscUJBQUE7RUFDQSx5QkFBQTtBQTdEeEI7QUFrRVk7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0VBRUEsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0VBRUEsdUJBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQWxFaEI7QUFvRWdCO0VBQ0ksV0FBQTtFQUNBLGdCQUFBO0FBbEVwQjtBQXFFZ0I7RUFDSSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSx1QkFBQTtFQUNBLDRCQUFBO0VBQ0EsOEJBQUE7RUFDQSwwQkFBQTtFQUVBLFVBQUE7RUFDQSxZQUFBO0FBcEVwQjtBQTBFSTtFQUNJLFdBQUE7QUF4RVI7QUEyRUk7RUFDSSxXQUFBO0VBQ0EsY0FBQTtFQUlBLHdCQUFBLEVBQUEsZ0JBQUE7RUFDQSxxQkFBQSxFQUFBLFlBQUE7RUFFQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLFNBQUE7RUFDQSxzQkFBQTtFQUVBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLGNBQUE7RUFDQSxRQUFBO0FBOUVSO0FBNkRRO0VBQ0ksYUFBQTtBQTNEWjtBQTZFUTtFQUNJLGNBQUE7RUFDQSxXQUFBO0FBM0VaIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICB3aWR0aDogNjM2cHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG1pbi13aWR0aDogNjM2cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0YyRjJGMjtcbiAgICBmb250LWZhbWlseTogJ05vYWgnLCBzZXJpZjtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgLnBsYXllciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgICAgIC8qIEF1dG8gbGF5b3V0ICovXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBnYXA6IDI0cHg7XG5cbiAgICAgICAgLmluZm8ge1xuICAgICAgICAgICAgaGVpZ2h0OiAxODBweDtcblxuICAgICAgICAgICAgLyogQXV0byBsYXlvdXQgKi9cbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgZ2FwOiAyMHB4O1xuXG4gICAgICAgICAgICAvKiBJbnNpZGUgYXV0byBsYXlvdXQgKi9cbiAgICAgICAgICAgIGZsZXg6IG5vbmU7XG4gICAgICAgICAgICBvcmRlcjogMDtcbiAgICAgICAgICAgIGFsaWduLXNlbGY6IHN0cmV0Y2g7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDA7XG5cbiAgICAgICAgICAgIC5jb3ZlciB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDE2MHB4O1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTgwcHg7XG5cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcblxuICAgICAgICAgICAgICAgIC8qIEluc2lkZSBhdXRvIGxheW91dCAqL1xuICAgICAgICAgICAgICAgIGZsZXg6IG5vbmU7XG4gICAgICAgICAgICAgICAgb3JkZXI6IDA7XG4gICAgICAgICAgICAgICAgZmxleC1ncm93OiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuY29udGVudCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG5cbiAgICAgICAgICAgICAgICAvKiBBdXRvIGxheW91dCAqL1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxNnB4IDAgMDtcbiAgICAgICAgICAgICAgICBnYXA6IDRweDtcblxuICAgICAgICAgICAgICAgIC8qIEluc2lkZSBhdXRvIGxheW91dCAqL1xuICAgICAgICAgICAgICAgIGZsZXg6IG5vbmU7XG4gICAgICAgICAgICAgICAgb3JkZXI6IDE7XG4gICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuXG4gICAgICAgICAgICAgICAgLm1haW4ge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDU2cHg7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogODBweDtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICMwRDBEMEQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLyogQXV0byBsYXlvdXQgKi9cbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDBweCAyMHB4IDBweCAwcHg7XG4gICAgICAgICAgICAgICAgICAgIGdhcDogNHB4O1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIEluc2lkZSBhdXRvIGxheW91dCAqL1xuICAgICAgICAgICAgICAgICAgICBmbGV4OiBub25lO1xuICAgICAgICAgICAgICAgICAgICBvcmRlcjogMDtcbiAgICAgICAgICAgICAgICAgICAgYWxpZ24tc2VsZjogc3RyZXRjaDtcbiAgICAgICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuXG4gICAgICAgICAgICAgICAgICAgIC50aXRsZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjVweDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogaWRlbnRpY2FsIHRvIGJveCBoZWlnaHQgKi9cblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogSW5zaWRlIGF1dG8gbGF5b3V0ICovXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbi1zZWxmOiBzdHJldGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmxleC1ncm93OiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLmFydGlzdCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjJweDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBJbnNpZGUgYXV0byBsYXlvdXQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IG5vbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduLXNlbGY6IHN0cmV0Y2g7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAuYWxidW0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIycHg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMjBweDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogSW5zaWRlIGF1dG8gbGF5b3V0ICovXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbi1zZWxmOiBzdHJldGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmxleC1ncm93OiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLmRldGFpbCB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qIEF1dG8gbGF5b3V0ICovXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMHB4O1xuICAgICAgICAgICAgICAgICAgICBnYXA6IDI0cHg7XG5cbiAgICAgICAgICAgICAgICAgICAgLyogSW5zaWRlIGF1dG8gbGF5b3V0ICovXG4gICAgICAgICAgICAgICAgICAgIGZsZXg6IG5vbmU7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyOiAxO1xuICAgICAgICAgICAgICAgICAgICBhbGlnbi1zZWxmOiBzdHJldGNoO1xuICAgICAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgLnRyYWNrLWRldGFpbCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBBdXRvIGxheW91dCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiAycHg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIEluc2lkZSBhdXRvIGxheW91dCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduLXNlbGY6IHN0cmV0Y2g7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC5sYWJlbCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxNXB4O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMTVweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBpZGVudGljYWwgdG8gYm94IGhlaWdodCAqL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSW5zaWRlIGF1dG8gbGF5b3V0ICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC52YWx1ZS13cmFwcGVyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBBdXRvIGxheW91dCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiA0cHg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBJbnNpZGUgYXV0byBsYXlvdXQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXgtZ3JvdzogMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5idG4tbWluLCAuYnRuLXBsdXMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjRweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjNUQ1RkVGO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogI0ZGRkZGRjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBJbnNpZGUgYXV0byBsYXlvdXQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleC1ncm93OiAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICZbZGlzYWJsZWRdIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogYmxhY2s7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXQtaWNvbiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAtMXB4IDAgMCAtMXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdC1pY29uIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC42Nik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsdWUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDdweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAzNnB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjRkZGRkZGO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMjBweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIGlkZW50aWNhbCB0byBib3ggaGVpZ2h0ICovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogQmFjayB0byBCbGFjayAqL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzBEMEQwRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlc2V0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE1cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMTVweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBpZGVudGljYWwgdG8gYm94IGhlaWdodCAqL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSW5zaWRlIGF1dG8gbGF5b3V0ICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAuY29tbWFuZHMge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDc2cHg7XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICAgICAgICAgICAvKiBBdXRvIGxheW91dCAqL1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgcGFkZGluZzogMCAxNnB4O1xuICAgICAgICAgICAgZ2FwOiAxMnB4O1xuXG4gICAgICAgICAgICAvKiBJbnNpZGUgYXV0byBsYXlvdXQgKi9cbiAgICAgICAgICAgIGZsZXg6IG5vbmU7XG4gICAgICAgICAgICBvcmRlcjogMTtcbiAgICAgICAgICAgIGFsaWduLXNlbGY6IHN0cmV0Y2g7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDA7XG5cbiAgICAgICAgICAgIC5idXR0b25zIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICAgICAgICAgICAgICAgIC8qIEF1dG8gbGF5b3V0ICovXG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAgNDRweDtcbiAgICAgICAgICAgICAgICBnYXA6IDM4cHg7XG5cbiAgICAgICAgICAgICAgICAvKiBJbnNpZGUgYXV0byBsYXlvdXQgKi9cbiAgICAgICAgICAgICAgICBmbGV4OiBub25lO1xuICAgICAgICAgICAgICAgIG9yZGVyOiAwO1xuICAgICAgICAgICAgICAgIGFsaWduLXNlbGY6IHN0cmV0Y2g7XG4gICAgICAgICAgICAgICAgZmxleC1ncm93OiAwO1xuXG4gICAgICAgICAgICAgICAgYnV0dG9uW2Rpc2FibGVkXSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBsaWdodGdyZXk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgOjpuZy1kZWVwIFttYXQtaWNvbi1idXR0b25dICB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMHB4O1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDNweDtcbiAgICAgICAgICAgICAgICAgICAgLS1tYXQtbWRjLWJ1dHRvbi1wZXJzaXN0ZW50LXJpcHBsZS1jb2xvcjogZ3JleTtcbiAgICAgICAgICAgICAgICAgICAgLS1tYXQtbWRjLWJ1dHRvbi1yaXBwbGUtY29sb3I6IHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4xKTtcblxuICAgICAgICAgICAgICAgICAgICAubWF0LW1kYy1idXR0b24tdG91Y2gtdGFyZ2V0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLmFjdGl2YWJsZSB7XG4gICAgICAgICAgICAgICAgICAgIC5hY3RpdmUge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICM1RDVGRUY7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAuY2xpY2thYmxlIHtcblxuICAgICAgICAgICAgICAgICAgICAjcGxheS1idXR0b24ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogYmxhY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAycHggc29saWQgIzBEMEQwRDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJltkaXNhYmxlZF0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBncmV5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogZ3JleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC52b2x1bWUge1xuICAgICAgICAgICAgICAgICAgICAvKiBBdXRvIGxheW91dCAqL1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgICAgICAgICBnYXA6IDhweDtcblxuICAgICAgICAgICAgICAgICAgICBhcHAtdWktc2xpZGVyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgLS1jb2xvcjogI0E1QTZGNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC0tYnV0dG9uLWNvbG9yOiAjNUQ1RkVGO1xuICAgICAgICAgICAgICAgICAgICAgICAgLS1kcmFnLWNvbG9yOiAjNUQ1RkVGO1xuICAgICAgICAgICAgICAgICAgICAgICAgLS1wcm9ncmVzcy1jb2xvcjogIzVENUZFRjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLnByb2dyZXNzIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE2cHg7XG4gICAgICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICAgICAgICAgICAgICAgIC8qIEF1dG8gbGF5b3V0ICovXG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAgMTZweDtcbiAgICAgICAgICAgICAgICBnYXA6IDEycHg7XG5cbiAgICAgICAgICAgICAgICAvKiBJbnNpZGUgYXV0byBsYXlvdXQgKi9cbiAgICAgICAgICAgICAgICBmbGV4OiBub25lO1xuICAgICAgICAgICAgICAgIG9yZGVyOiAxO1xuICAgICAgICAgICAgICAgIGFsaWduLXNlbGY6IHN0cmV0Y2g7XG4gICAgICAgICAgICAgICAgZmxleC1ncm93OiAwO1xuXG4gICAgICAgICAgICAgICAgLnRpbWVyIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM3cHg7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYXBwLXVpLXNsaWRlciB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgICAgIC0tY29sb3I6ICNEQUM0Q0Y7XG4gICAgICAgICAgICAgICAgICAgIC0tZHJhZy1jb2xvcjogI2YzMjA3MTtcbiAgICAgICAgICAgICAgICAgICAgLS1idXR0b24tY29sb3I6ICNGQTU0ODU7XG4gICAgICAgICAgICAgICAgICAgIC0tYnV0dG9uLWJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgICAgICAgICAgICAgIC0tYnV0dG9uLWJvcmRlci1jb2xvcjogI0VBRUVGNDtcbiAgICAgICAgICAgICAgICAgICAgLS1idXR0b24tYm9yZGVyLXdpZHRoOiAycHg7XG5cbiAgICAgICAgICAgICAgICAgICAgZmxleDogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nLXNjcm9sbGJhciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC50cmFja3Mge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lOyAgLyogSUUgYW5kIEVkZ2UgKi9cbiAgICAgICAgc2Nyb2xsYmFyLXdpZHRoOiBub25lOyAgLyogRmlyZWZveCAqL1xuXG4gICAgICAgIC8qIEF1dG8gbGF5b3V0ICovXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgICBwYWRkaW5nOiAyNHB4O1xuICAgICAgICBnYXA6IDI0cHg7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cbiAgICAgICAgLyogSW5zaWRlIGF1dG8gbGF5b3V0ICovXG4gICAgICAgIGZsZXg6IGF1dG87XG4gICAgICAgIGZsZXgtc2hyaW5rOiAxO1xuICAgICAgICBvcmRlcjogMjtcblxuICAgICAgICBhcHAtc3RlbS1wbGF5ZXIge1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
  changeDetection: 0
});

/***/ }),

/***/ 7308:
/*!*************************************************************!*\
  !*** ./src/app/player/stem-player/stem-player.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StemPlayerComponent: () => (/* binding */ StemPlayerComponent)
/* harmony export */ });
/* harmony import */ var _home_runner_work_muese_client_muese_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _player_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../player.component */ 7105);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app.component */ 6401);
/* harmony import */ var _audio_player_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../audio-player.service */ 9571);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _app_ui_progress_bar_slider_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../app-ui/progress-bar/slider.component */ 7830);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _app_ui_balance_button_balance_button_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../app-ui/balance-button/balance-button.component */ 2856);












const _c0 = ["path"];
const _c1 = ["path2"];
const _c2 = function (a0) {
  return {
    loading: a0
  };
};
const _c3 = function (a0) {
  return {
    dragged: a0
  };
};
class StemPlayerComponent {
  constructor(audioPlayer) {
    this.audioPlayer = audioPlayer;
    this.dragData = null;
    this.iconName = '';
    this.progress = 0;
    this.soloMode = [];
    this.title = '';
    this.trackFilename = '';
    this.dragStatus = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.loaded = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.progressChange = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.clickSolo = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.balance = 0;
    this.currentTime = 0;
    this.loading = false;
    this.muted = false;
    this.solo = false;
    this.volume = _player_component__WEBPACK_IMPORTED_MODULE_1__.PlayerComponent.DEFAULT_VOLUME;
  }
  ngOnChanges(changes) {
    if (changes['stem']) {
      this.loading = true;
      this.currentTime = 0;
      this.muted = false;
      this.progress = 0;
      this.pathRef?.nativeElement?.setAttribute('d', '');
      this.path2Ref?.nativeElement?.setAttribute('d', '');
      this.unsubscribeLoading();
      this.loadTrack(changes['stem'].currentValue).then(arrayBuffer => {
        // @ts-ignored
        if (!navigator.userAgentData?.mobile && this.stem) {
          this.analyzeTrack(arrayBuffer, this.stem);
        }
      }, e => console.log(e)).finally(() => {
        this.unsubscribeLoading();
        this.loading = false;
        this.loaded.emit();
        this.progress = 0;
      });
    }
    if (changes['soloMode']) {
      this.solo = this.soloMode.includes(this);
      this.mute(this.muted);
    }
  }
  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
  onBalanceChange(balance) {
    this.balance = balance;
    this.audioPlayer.setBalance(this.title, balance);
  }
  onMute(muted) {
    if (typeof muted === 'undefined') {
      this.muted = !this.muted;
    } else {
      this.muted = muted;
    }
    if (this.muted && this.solo) {
      this.clickSolo.emit(this);
    } else {
      this.mute(this.muted);
    }
  }
  onCanvasTap(e, container) {
    let hammerEvent = e;
    let clientX;
    if (hammerEvent.srcEvent instanceof TouchEvent) {
      clientX = hammerEvent.srcEvent.touches[0]?.clientX;
    } else {
      clientX = hammerEvent.srcEvent.clientX;
    }
    const rect = container.getBoundingClientRect();
    this.progressChange.emit((clientX - rect.left) / rect.width);
  }
  onCanvasMouseDown(e, container) {
    let hammerEvent = e;
    hammerEvent.preventDefault();
    let clientX;
    if (hammerEvent.srcEvent instanceof TouchEvent) {
      clientX = hammerEvent.srcEvent.touches[0]?.clientX;
    } else {
      clientX = hammerEvent.srcEvent.clientX;
    }
    let rect = container.getBoundingClientRect();
    this.dragStatus.emit({
      rect,
      progress: (clientX - rect.left) / rect.width,
      origin: this
    });
  }
  onVolumeProgress(volumeStatus) {
    this.setVolume(volumeStatus.progress);
  }
  documentMouseMove(e) {
    if (this.dragData?.origin == this) {
      e.preventDefault();
      let clientX;
      if (e.srcEvent instanceof TouchEvent) {
        clientX = e.srcEvent.touches[0]?.clientX;
      } else {
        clientX = e.srcEvent.clientX;
      }
      let progress = (clientX - this.dragData.rect.left) / this.dragData.rect.width;
      if (progress < 0) {
        progress = 0;
      } else if (progress > 1) {
        progress = 1;
      }
      this.dragStatus.emit({
        ...this.dragData,
        progress
      });
    }
  }
  windowMouseUp(e) {
    if (this.dragData?.origin == this) {
      e.preventDefault();
      this.progressChange.emit(this.dragData.progress);
      this.dragStatus.emit(null);
    }
  }
  onSolo() {
    this.clickSolo.emit(this);
  }
  analyzeTrack(arrayBuffer, currentStem) {
    this.audioPlayer.getAudioContext()?.decodeAudioData(arrayBuffer).then(audioBuffer => {
      if (currentStem !== this.stem) return;
      const left = audioBuffer.getChannelData(0);
      const right = audioBuffer.getChannelData(1);
      for (let i = 0; i < audioBuffer.length; i++) left[i] = (left[i] + right[i]) / 2;
      audioBuffer.copyToChannel(left, 0);
      // WaveForm
      const newPath = linearPath(audioBuffer, {
        normalize: true,
        samples: 150,
        type: 'mirror',
        width: 377,
        height: 32,
        paths: [{
          d: 'V',
          sx: 1,
          sy: 0,
          x: 50,
          ey: 100
        }]
      });
      this.pathRef?.nativeElement?.setAttribute('d', newPath);
      this.path2Ref?.nativeElement?.setAttribute('d', newPath);
    });
  }
  loadTrack(currentStem) {
    var _this = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref = (0,_home_runner_work_muese_client_muese_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
        yield _this.audioPlayer.isInitialized();
        if (currentStem === _this.stem && _this.stem) {
          const url = `${_app_component__WEBPACK_IMPORTED_MODULE_2__.SERVER_URL}/music/output/${_this.trackFilename}/${_this.stem.filename}`;
          _this.setVolume(_player_component__WEBPACK_IMPORTED_MODULE_1__.PlayerComponent.DEFAULT_VOLUME);
          _this.loadingSubscription = _this.audioPlayer.loadFromUrl(_this.title, url).subscribe({
            next: v => {
              if (v.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpEventType.DownloadProgress && typeof v.progress !== 'undefined') {
                _this.progress = v.progress;
              } else if (v.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpEventType.Response) {
                if (v.arrayBuffer) {
                  resolve(v.arrayBuffer);
                } else {
                  reject('no buffer');
                }
              }
            },
            error: e => reject(e)
          });
        } else {
          reject('no stem or wrong stem');
        }
      });
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  mute(muted) {
    this.audioPlayer.mute(this.title, !this.solo && (muted || this.soloMode.length != 0));
  }
  setVolume(volume) {
    this.volume = volume;
    this.audioPlayer.setVolume(volume, this.title);
  }
  unsubscribeLoading() {
    this.loadingSubscription?.unsubscribe();
    this.loadingSubscription = undefined;
  }
}
StemPlayerComponent.ɵfac = function StemPlayerComponent_Factory(t) {
  return new (t || StemPlayerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_audio_player_service__WEBPACK_IMPORTED_MODULE_3__.AudioPlayerService));
};
StemPlayerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: StemPlayerComponent,
  selectors: [["app-stem-player"]],
  viewQuery: function StemPlayerComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.pathRef = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.path2Ref = _t.first);
    }
  },
  hostBindings: function StemPlayerComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("panmove", function StemPlayerComponent_panmove_HostBindingHandler($event) {
        return ctx.documentMouseMove($event);
      })("panend", function StemPlayerComponent_panend_HostBindingHandler($event) {
        return ctx.windowMouseUp($event);
      });
    }
  },
  inputs: {
    dragData: "dragData",
    iconName: "iconName",
    progress: "progress",
    soloMode: "soloMode",
    stem: "stem",
    title: "title",
    trackFilename: "trackFilename"
  },
  outputs: {
    dragStatus: "dragStatus",
    loaded: "loaded",
    progressChange: "progressChange",
    clickSolo: "clickSolo"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵNgOnChangesFeature"]],
  decls: 29,
  vars: 26,
  consts: [[1, "track"], [1, "title"], [1, "main"], [1, "left"], [1, "top-left"], [3, "ariaLabel", "balance", "balanceChange"], [3, "svgIcon"], [1, "small-buttons"], ["mat-mini-fab", "", 1, "mute", 3, "click"], ["svgIcon", "m"], ["mat-mini-fab", "", 1, "solo", 3, "click"], ["svgIcon", "s"], [3, "ariaLabel", "emitSeekOnWheel", "faded", "hasButton", "seek", "progress"], [1, "progress-container", 3, "tap", "panstart"], ["progressContainer", ""], ["viewBox", "0 0 377 32", "preserveAspectRatio", "none"], ["path", ""], [1, "progress-bar", 3, "ngClass"], [3, "ngClass"], ["path2", ""], ["id", "MyGradient", "gradientTransform", "rotate(90)"], ["offset", "0%", "stop-color", "#F95B98"], ["offset", "100%", "stop-color", "#FA4D71"]],
  template: function StemPlayerComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 2)(6, "div", 3)(7, "div", 4)(8, "app-ui-balance-button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("balanceChange", function StemPlayerComponent_Template_app_ui_balance_button_balanceChange_8_listener($event) {
        return ctx.onBalanceChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "mat-icon", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "div", 7)(11, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function StemPlayerComponent_Template_button_click_11_listener() {
        return ctx.onMute();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "mat-icon", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function StemPlayerComponent_Template_button_click_13_listener() {
        return ctx.onSolo();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](14, "mat-icon", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "app-ui-slider", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("progress", function StemPlayerComponent_Template_app_ui_slider_progress_15_listener($event) {
        return ctx.onVolumeProgress($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "div", 13, 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("tap", function StemPlayerComponent_Template_div_tap_16_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r3);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](17);
        return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onCanvasTap($event, _r0));
      })("panstart", function StemPlayerComponent_Template_div_panstart_16_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r3);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](17);
        return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onCanvasMouseDown($event, _r0));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "svg", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](19, "path", null, 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "svg", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](23, "path", 18, 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "defs")(26, "linearGradient", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](27, "stop", 21)(28, "stop", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()()()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", ctx.title, " -");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx.stem == null ? null : ctx.stem.sourceName, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ariaLabel", ctx.title + " balance spin button")("balance", ctx.balance);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("svgIcon", ctx.iconName);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("active", ctx.muted && !ctx.solo)("dimmed", ctx.muted && ctx.solo);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("active", ctx.solo);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ariaLabel", ctx.title + "stem volume")("emitSeekOnWheel", true)("faded", ctx.muted)("hasButton", true)("seek", ctx.volume);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleProp"]("width", ctx.dragData ? ctx.dragData.progress * 100 : ctx.progress * 100, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](22, _c2, ctx.loading));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleProp"]("width", _r0.offsetWidth, "px");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](24, _c3, !!ctx.dragData));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _app_ui_progress_bar_slider_component__WEBPACK_IMPORTED_MODULE_4__.SliderComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatMiniFabButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIcon, _app_ui_balance_button_balance_button_component__WEBPACK_IMPORTED_MODULE_5__.BalanceButtonComponent],
  styles: [".track[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 110px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 0;\n  gap: 8px;\n}\n.track[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 22px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 0;\n  gap: 8px;\n  font-family: \"Noah\", serif;\n  font-style: normal;\n  font-size: 16px;\n  line-height: 20px;\n  \n\n  \n\n  color: #0D0D0D;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 78px;\n  \n\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  padding: 0;\n  gap: 24px;\n  \n\n  flex: none;\n  order: 1;\n  align-self: stretch;\n  flex-grow: 1;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%] {\n  width: 92px;\n  height: 78px;\n  \n\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 14px;\n  \n\n  flex: none;\n  order: 0;\n  align-self: stretch;\n  flex-grow: 0;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   .top-left[_ngcontent-%COMP%] {\n  \n\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  padding: 0;\n  gap: 24px;\n  height: 56px;\n  \n\n  flex: none;\n  order: 0;\n  flex-grow: 0;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   .top-left[_ngcontent-%COMP%]   app-ui-balance-button[_ngcontent-%COMP%] {\n  display: block;\n  width: 56px;\n  height: 56px;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   .top-left[_ngcontent-%COMP%]   button[mat-fab][_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  box-shadow: none;\n  background-color: white;\n  color: black;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   .top-left[_ngcontent-%COMP%]   .small-buttons[_ngcontent-%COMP%] {\n  \n\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 0px;\n  gap: 8px;\n  width: 24px;\n  height: 56px;\n  \n\n  flex: none;\n  order: 0;\n  align-self: stretch;\n  flex-grow: 1;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   .top-left[_ngcontent-%COMP%]   .small-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  \n\n  flex: none;\n  order: 0;\n  flex-grow: 0;\n  background-color: transparent;\n  color: black;\n  box-shadow: none;\n  border: 1px solid black;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   .top-left[_ngcontent-%COMP%]   .small-buttons[_ngcontent-%COMP%]   button.mute[_ngcontent-%COMP%] {\n  top: 0;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   .top-left[_ngcontent-%COMP%]   .small-buttons[_ngcontent-%COMP%]   button.solo[_ngcontent-%COMP%] {\n  bottom: 0;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   .top-left[_ngcontent-%COMP%]   .small-buttons[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background-color: #5D5FEF;\n  color: white;\n  border: none;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   .top-left[_ngcontent-%COMP%]   .small-buttons[_ngcontent-%COMP%]   button.dimmed[_ngcontent-%COMP%] {\n  background-color: transparent;\n  color: #5D5FEF;\n  box-shadow: none;\n  border: 1px solid #5D5FEF;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   .top-left[_ngcontent-%COMP%]   .small-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  display: block;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   .top-left[_ngcontent-%COMP%]   .small-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]     .mat-mdc-button-touch-target {\n  width: 24px;\n  height: 24px;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   app-ui-slider[_ngcontent-%COMP%] {\n  \n\n  width: 92px;\n  --color: #A5A6F6;\n  --button-color: #5D5FEF;\n  --drag-color: #5D5FEF;\n  --progress-color: #5D5FEF;\n  \n\n  flex: none;\n  order: 1;\n  align-self: stretch;\n  flex-grow: 0;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 78px;\n  background: #FFFFFF;\n  border-radius: 8px;\n  position: relative;\n  cursor: pointer;\n  \n\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 0;\n  gap: 16px;\n  \n\n  flex: none;\n  order: 1;\n  align-self: stretch;\n  flex-grow: 1;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 32px;\n  \n\n  flex: none;\n  order: 0;\n  flex-grow: 1;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  stroke: black;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%] {\n  width: 0;\n  height: 100%;\n  border-top-left-radius: 8px;\n  border-bottom-left-radius: 8px;\n  position: absolute;\n  overflow: hidden;\n  background-color: white;\n  display: flex;\n  align-items: center;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress-bar.loading[_ngcontent-%COMP%] {\n  background-color: yellow;\n  opacity: 10%;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%], .track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  height: 32px;\n  margin: auto 0;\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%]   path[_ngcontent-%COMP%], .track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  stroke: url(#MyGradient);\n}\n.track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%]   path.dragged[_ngcontent-%COMP%], .track[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   path.dragged[_ngcontent-%COMP%] {\n  stroke: blue;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxheWVyL3N0ZW0tcGxheWVyL3N0ZW0tcGxheWVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0FBQ0o7QUFDSTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUVBLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSw0QkFBQTtFQUdBLGtCQUFBO0VBQ0EsY0FBQTtBQUZSO0FBS0k7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUVBLGdCQUFBO0VBRUEsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUVBLHVCQUFBO0VBRUEsVUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFQUjtBQVNRO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFFQSxnQkFBQTtFQUVBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsU0FBQTtFQUdBLHVCQUFBO0VBRUEsVUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFaWjtBQWNZO0VBQ0ksZ0JBQUE7RUFFQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBRUEsWUFBQTtFQUdBLHVCQUFBO0VBRUEsVUFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0FBakJoQjtBQW1CZ0I7RUFDSSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFqQnBCO0FBcUJnQjtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBRUEsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7QUFwQnBCO0FBdUJnQjtFQUNJLGdCQUFBO0VBRUEsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsOEJBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxRQUFBO0VBRUEsV0FBQTtFQUNBLFlBQUE7RUFHQSx1QkFBQTtFQUVBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBMUJwQjtBQTRCb0I7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUVBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBRUEsNkJBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQTVCeEI7QUE4QndCO0VBQ0ksTUFBQTtBQTVCNUI7QUE4QndCO0VBQ0ksU0FBQTtBQTVCNUI7QUErQndCO0VBQ0kseUJBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtBQTdCNUI7QUFnQ3dCO0VBQ0ksNkJBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtBQTlCNUI7QUFpQ3dCO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FBL0I1QjtBQWtDd0I7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQWhDNUI7QUFzQ1k7RUFDSSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EscUJBQUE7RUFDQSx5QkFBQTtFQUVBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFyQ2hCO0FBeUNRO0VBQ0ksWUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBRUEsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBRUEsdUJBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQXpDWjtBQTJDWTtFQUNJLFlBQUE7RUFDQSxZQUFBO0VBRUEsdUJBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7QUExQ2hCO0FBNENnQjtFQUNJLGFBQUE7QUExQ3BCO0FBOENZO0VBQ0ksUUFBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FBNUNoQjtBQThDZ0I7RUFDSSx3QkFBQTtFQUNBLFlBQUE7QUE1Q3BCO0FBK0NnQjtFQUNJLFlBQUE7RUFDQSxjQUFBO0FBN0NwQjtBQStDb0I7RUFDSSx3QkFBQTtBQTdDeEI7QUErQ3dCO0VBQ0ksWUFBQTtBQTdDNUIiLCJzb3VyY2VzQ29udGVudCI6WyIudHJhY2sge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTEwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIHBhZGRpbmc6IDA7XG4gICAgZ2FwOiA4cHg7XG5cbiAgICAudGl0bGUge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAyMnB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBnYXA6IDhweDtcblxuICAgICAgICBmb250LWZhbWlseTogJ05vYWgnLCBzZXJpZjtcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAgICAgICAvKiBpZGVudGljYWwgdG8gYm94IGhlaWdodCAqL1xuXG5cbiAgICAgICAgLyogQmFjayB0byBCbGFjayAqL1xuICAgICAgICBjb2xvcjogIzBEMEQwRDtcbiAgICB9XG5cbiAgICAubWFpbiB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDc4cHg7XG5cbiAgICAgICAgLyogQXV0byBsYXlvdXQgKi9cblxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgZ2FwOiAyNHB4O1xuXG4gICAgICAgIC8qIEluc2lkZSBhdXRvIGxheW91dCAqL1xuXG4gICAgICAgIGZsZXg6IG5vbmU7XG4gICAgICAgIG9yZGVyOiAxO1xuICAgICAgICBhbGlnbi1zZWxmOiBzdHJldGNoO1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICAgICAgLmxlZnQge1xuICAgICAgICAgICAgd2lkdGg6IDkycHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDc4cHg7XG5cbiAgICAgICAgICAgIC8qIEF1dG8gbGF5b3V0ICovXG5cbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICBnYXA6IDE0cHg7XG5cblxuICAgICAgICAgICAgLyogSW5zaWRlIGF1dG8gbGF5b3V0ICovXG5cbiAgICAgICAgICAgIGZsZXg6IG5vbmU7XG4gICAgICAgICAgICBvcmRlcjogMDtcbiAgICAgICAgICAgIGFsaWduLXNlbGY6IHN0cmV0Y2g7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDA7XG5cbiAgICAgICAgICAgIC50b3AtbGVmdCB7XG4gICAgICAgICAgICAgICAgLyogQXV0byBsYXlvdXQgKi9cblxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgICAgIGdhcDogMjRweDtcblxuICAgICAgICAgICAgICAgIGhlaWdodDogNTZweDtcblxuXG4gICAgICAgICAgICAgICAgLyogSW5zaWRlIGF1dG8gbGF5b3V0ICovXG5cbiAgICAgICAgICAgICAgICBmbGV4OiBub25lO1xuICAgICAgICAgICAgICAgIG9yZGVyOiAwO1xuICAgICAgICAgICAgICAgIGZsZXgtZ3JvdzogMDtcblxuICAgICAgICAgICAgICAgIGFwcC11aS1iYWxhbmNlLWJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTZweDtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1NnB4O1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgYnV0dG9uW21hdC1mYWJdIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDU2cHg7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTZweDtcblxuICAgICAgICAgICAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IGJsYWNrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC5zbWFsbC1idXR0b25zIHtcbiAgICAgICAgICAgICAgICAgICAgLyogQXV0byBsYXlvdXQgKi9cblxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwcHg7XG4gICAgICAgICAgICAgICAgICAgIGdhcDogOHB4O1xuXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2cHg7XG5cblxuICAgICAgICAgICAgICAgICAgICAvKiBJbnNpZGUgYXV0byBsYXlvdXQgKi9cblxuICAgICAgICAgICAgICAgICAgICBmbGV4OiBub25lO1xuICAgICAgICAgICAgICAgICAgICBvcmRlcjogMDtcbiAgICAgICAgICAgICAgICAgICAgYWxpZ24tc2VsZjogc3RyZXRjaDtcbiAgICAgICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjRweDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjRweDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyogSW5zaWRlIGF1dG8gbGF5b3V0ICovXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGJsYWNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAmLm11dGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICYuc29sbyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAmLmFjdGl2ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzVENUZFRjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAmLmRpbW1lZCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICM1RDVGRUY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjNUQ1RkVGO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXQtaWNvbiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEycHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMnB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICA6Om5nLWRlZXAgLm1hdC1tZGMtYnV0dG9uLXRvdWNoLXRhcmdldCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhcHAtdWktc2xpZGVyIHtcbiAgICAgICAgICAgICAgICAvKiBMZXZlbCAtIFRpbWVMaW5lICovXG4gICAgICAgICAgICAgICAgd2lkdGg6IDkycHg7XG4gICAgICAgICAgICAgICAgLS1jb2xvcjogI0E1QTZGNjtcbiAgICAgICAgICAgICAgICAtLWJ1dHRvbi1jb2xvcjogIzVENUZFRjtcbiAgICAgICAgICAgICAgICAtLWRyYWctY29sb3I6ICM1RDVGRUY7XG4gICAgICAgICAgICAgICAgLS1wcm9ncmVzcy1jb2xvcjogIzVENUZFRjtcblxuICAgICAgICAgICAgICAgIC8qIEluc2lkZSBhdXRvIGxheW91dCAqL1xuICAgICAgICAgICAgICAgIGZsZXg6IG5vbmU7XG4gICAgICAgICAgICAgICAgb3JkZXI6IDE7XG4gICAgICAgICAgICAgICAgYWxpZ24tc2VsZjogc3RyZXRjaDtcbiAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAucHJvZ3Jlc3MtY29udGFpbmVyIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDBweDtcbiAgICAgICAgICAgIGhlaWdodDogNzhweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNGRkZGRkY7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICAgICAgIC8qIEF1dG8gbGF5b3V0ICovXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgZ2FwOiAxNnB4O1xuXG4gICAgICAgICAgICAvKiBJbnNpZGUgYXV0byBsYXlvdXQgKi9cbiAgICAgICAgICAgIGZsZXg6IG5vbmU7XG4gICAgICAgICAgICBvcmRlcjogMTtcbiAgICAgICAgICAgIGFsaWduLXNlbGY6IHN0cmV0Y2g7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICAgICAgICAgIHN2ZyB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMHB4O1xuICAgICAgICAgICAgICAgIGhlaWdodDogMzJweDtcblxuICAgICAgICAgICAgICAgIC8qIEluc2lkZSBhdXRvIGxheW91dCAqL1xuICAgICAgICAgICAgICAgIGZsZXg6IG5vbmU7XG4gICAgICAgICAgICAgICAgb3JkZXI6IDA7XG4gICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuXG4gICAgICAgICAgICAgICAgcGF0aCB7XG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZTogYmxhY2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAucHJvZ3Jlc3MtYmFyIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogOHB4O1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDhweDtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgICAgICAgICAmLmxvYWRpbmcge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEwJTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYW52YXMsIHN2ZyB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiBhdXRvIDA7XG5cbiAgICAgICAgICAgICAgICAgICAgcGF0aCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U6IHVybCgjTXlHcmFkaWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICYuZHJhZ2dlZCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiBibHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 555:
/*!********************************************************!*\
  !*** ./src/app/track-upload/track-upload.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackUploadComponent: () => (/* binding */ TrackUploadComponent)
/* harmony export */ });
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.component */ 6401);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8849);





const _c0 = ["fileUpload"];
class TrackUploadComponent {
  constructor(dialogRef, httpClient) {
    this.dialogRef = dialogRef;
    this.httpClient = httpClient;
    this.submittable = true;
  }
  onSubmit(form) {
    this.submittable = false;
    let files = this.fileUploadElementRef?.nativeElement.files;
    if (files) {
      let fileData = files[0];
      let formData = new FormData();
      formData.append('artist', form.value.artist);
      formData.append('title', form.value.title);
      formData.append('file', fileData);
      this.httpClient.post(`${_app_component__WEBPACK_IMPORTED_MODULE_0__.SERVER_URL}/track`, formData).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: e => {
          this.submittable = true;
          alert(`Error ${e.status}: ${e.message}`);
        }
      });
    }
  }
}
TrackUploadComponent.ɵfac = function TrackUploadComponent_Factory(t) {
  return new (t || TrackUploadComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
TrackUploadComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: TrackUploadComponent,
  selectors: [["app-track-upload"]],
  viewQuery: function TrackUploadComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.fileUploadElementRef = _t.first);
    }
  },
  decls: 11,
  vars: 1,
  consts: [[3, "ngSubmit"], ["uploader", "ngForm"], ["type", "text", "name", "artist", "placeholder", "Artist", "ngModel", ""], ["type", "text", "name", "title", "placeholder", "Title", "ngModel", ""], ["type", "file", "name", "file", "ngModel", ""], ["fileUpload", ""], ["type", "submit", "value", "submit", 3, "disabled"]],
  template: function TrackUploadComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Track upload");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "form", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function TrackUploadComponent_Template_form_ngSubmit_2_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);
        return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.onSubmit(_r0));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "input", 2)(5, "input", 3)(6, "input", 4, 5)(8, "br")(9, "br")(10, "input", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.submittable);
    }
  },
  dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgForm],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 4913:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 8629);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ }),

/***/ 4232:
/*!***************************!*\
  !*** ./src/model/stem.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StemSourceType: () => (/* binding */ StemSourceType),
/* harmony export */   StemType: () => (/* binding */ StemType)
/* harmony export */ });
var StemType;
(function (StemType) {
  StemType[StemType["DRUMS"] = 0] = "DRUMS";
  StemType[StemType["PIANO"] = 1] = "PIANO";
  StemType[StemType["BASS"] = 2] = "BASS";
  StemType[StemType["VOCALS"] = 3] = "VOCALS";
  StemType[StemType["OTHER"] = 4] = "OTHER";
})(StemType || (StemType = {}));
var StemSourceType;
(function (StemSourceType) {
  StemSourceType[StemSourceType["NATIVE"] = 0] = "NATIVE";
  StemSourceType[StemSourceType["IA"] = 1] = "IA";
  StemSourceType[StemSourceType["USER"] = 2] = "USER";
})(StemSourceType || (StemSourceType = {}));

/***/ }),

/***/ 2531:
/*!****************************!*\
  !*** ./src/model/track.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackStatus: () => (/* binding */ TrackStatus)
/* harmony export */ });
var TrackStatus;
(function (TrackStatus) {
  TrackStatus[TrackStatus["IDLE"] = 0] = "IDLE";
  TrackStatus[TrackStatus["QUEUED"] = 1] = "QUEUED";
  TrackStatus[TrackStatus["PROCESSING"] = 2] = "PROCESSING";
  TrackStatus[TrackStatus["READY"] = 3] = "READY";
  TrackStatus[TrackStatus["ERROR"] = 4] = "ERROR";
})(TrackStatus || (TrackStatus = {}));

/***/ }),

/***/ 2907:
/*!********************************************!*\
  !*** ./src/assets/scripts/Superpowered.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _asyncToGenerator = (__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/asyncToGenerator.js */ 1778)["default"]);
var _defineProperty = (__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/defineProperty.js */ 9482)["default"]);
/* eslint-disable */

class SuperpoweredGlue {
  niceSize(bytes) {
    if (bytes == 0) return '0 byte';else if (bytes == 1) return '1 byte';
    const postfix = [' bytes', ' kb', ' mb', ' gb', ' tb'],
      n = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, n), 2) + postfix[n];
  }
  createFloatArray(length) {
    return this.createViewFromType(9, this.malloc(length * 4), length);
  }
  static Instantiate(licenseKey, url) {
    return _asyncToGenerator(function* () {
      if (url !== undefined) SuperpoweredGlue.SuperpoweredGlueSourceURL = url;
      const obj = new SuperpoweredGlue();
      yield fetch(SuperpoweredGlue.wasmbin).then(response => response.arrayBuffer()).then(bytes => obj.loadFromArrayBuffer(bytes));
      obj.Initialize(licenseKey);
      return obj;
    })();
  }
  constructor() {
    this.id = Math.floor(Math.random() * Date.now());
    this.linearMemory = null;
    this.__lastObject__ = null;
    this.__classUnderConstruction__ = null;
    this.__functions__ = {};
    this.__classes__ = {};
    this.__exportsToWasm__ = {};
    this.__views__ = new Set();
    this.trackLoaderReceivers = [];
    const glue = this;
    this.Uint8Buffer = class {
      constructor(length) {
        return glue.createViewFromType(1, glue.malloc(length), length);
      }
    };
    this.Int8Buffer = class {
      constructor(length) {
        return glue.createViewFromType(2, glue.malloc(length), length);
      }
    };
    this.Uint16Buffer = class {
      constructor(length) {
        return glue.createViewFromType(3, glue.malloc(length * 2), length);
      }
    };
    this.Int16Buffer = class {
      constructor(length) {
        return glue.createViewFromType(4, glue.malloc(length * 2), length);
      }
    };
    this.Uint32Buffer = class {
      constructor(length) {
        return glue.createViewFromType(5, glue.malloc(length * 4), length);
      }
    };
    this.Int32Buffer = class {
      constructor(length) {
        return glue.createViewFromType(6, glue.malloc(length * 4), length);
      }
    };
    this.BigUint64Buffer = class {
      constructor(length) {
        return glue.createViewFromType(7, glue.malloc(length * 8), length);
      }
    };
    this.BigInt64Buffer = class {
      constructor(length) {
        return glue.createViewFromType(8, glue.malloc(length * 8), length);
      }
    };
    this.Float32Buffer = class {
      constructor(length) {
        return glue.createViewFromType(9, glue.malloc(length * 4), length);
      }
    };
    this.Float64Buffer = class {
      constructor(length) {
        return glue.createViewFromType(10, glue.malloc(length * 8), length);
      }
    };
    this.__exportsToWasm__.consolelog = this.consolelog.bind(this);
    this.__exportsToWasm__.emscripten_notify_memory_growth = this.onMemoryGrowth.bind(this);
    this.__exportsToWasm__.__createClass__ = this.createClass.bind(this);
    this.__exportsToWasm__.__createStaticProperty__ = this.createStaticProperty.bind(this);
    this.__exportsToWasm__.__createStaticMethod__ = this.createStaticMethod.bind(this);
    this.__exportsToWasm__.__createConstructor__ = this.createConstructor.bind(this);
    this.__exportsToWasm__.__createDestructor__ = this.createDestructor.bind(this);
    this.__exportsToWasm__.__createProperty__ = this.createProperty.bind(this);
    this.__exportsToWasm__.__createMethod__ = this.createMethod.bind(this);
    this.__exportsToWasm__.__createFunction__ = this.createFunction.bind(this);
    this.__exportsToWasm__.__createClassConstant__ = this.createClassConstant.bind(this);
    this.__exportsToWasm__.__createConstant__ = this.createConstant.bind(this);
    this.__exportsToWasm__.__runjs__ = function (pointer) {
      return eval(this.toString(pointer));
    }.bind(this);
    this.__exportsToWasm__.abs = function (value) {
      return Math.abs(value);
    };
    this.__exportsToWasm__.round = function (value) {
      return Math.round(value);
    };
    this.__exportsToWasm__.roundf = function (value) {
      return Math.fround(value);
    };
    this.wasi = {
      proc_exit: function () {
        console.log('abort');
      }
    };
  }
  updateBuffer(buffer, arraybuffer) {
    buffer.__arraybuffer__ = arraybuffer;
    switch (buffer.__type__) {
      case 1:
        buffer.array = new Uint8Array(buffer.__arraybuffer__, buffer.pointer, buffer.length < 0 ? buffer.__arraybuffer__.byteLength - buffer.pointer : buffer.length);
        break;
      case 2:
        buffer.array = new Int8Array(buffer.__arraybuffer__, buffer.pointer, buffer.length < 0 ? buffer.__arraybuffer__.byteLength - buffer.pointer : buffer.length);
        break;
      case 3:
        buffer.array = new Uint16Array(buffer.__arraybuffer__, buffer.pointer, buffer.length < 0 ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 2 : buffer.length);
        break;
      case 4:
        buffer.array = new Int16Array(buffer.__arraybuffer__, buffer.pointer, buffer.length < 0 ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 2 : buffer.length);
        break;
      case 5:
        buffer.array = new Uint32Array(buffer.__arraybuffer__, buffer.pointer, buffer.length < 0 ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 4 : buffer.length);
        break;
      case 6:
        buffer.array = new Int32Array(buffer.__arraybuffer__, buffer.pointer, buffer.length < 0 ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 4 : buffer.length);
        break;
      case 7:
        buffer.array = new BigUint64Array(buffer.__arraybuffer__, buffer.pointer, buffer.length < 0 ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 8 : buffer.length);
        break;
      case 8:
        buffer.array = new BigInt64Array(buffer.__arraybuffer__, buffer.pointer, buffer.length < 0 ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 8 : buffer.length);
        break;
      case 9:
        buffer.array = new Float32Array(buffer.__arraybuffer__, buffer.pointer, buffer.length < 0 ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 4 : buffer.length);
        break;
      case 10:
        buffer.array = new Float64Array(buffer.__arraybuffer__, buffer.pointer, buffer.length < 0 ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 8 : buffer.length);
        break;
    }
  }
  createViewFromType(type, pointer, length) {
    const buffer = {
      pointer: pointer,
      length: length,
      __arraybuffer__: this.linearMemory,
      __type__: type,
      __glue__: this,
      free() {
        this.__glue__.free(this.pointer);
        Object.getOwnPropertyNames(this).forEach(property => delete this[property]);
        Object.setPrototypeOf(this, null);
      }
    };
    this.updateBuffer(buffer, this.linearMemory);
    this.__views__.add(buffer);
    return buffer;
  }
  returnPointerToView(r, type) {
    if (type > 0 && typeof r !== 'undefined') {
      const length = this.__functions__.__lastarraylength__();
      r = this.createViewFromType(type, r, length > 0 ? length : -1);
    }
    return r;
  }
  invokeMethod() {
    if (arguments.length == 2 && typeof arguments[1] == 'object') {
      const obj = arguments[1];
      let n = 1;
      for (const m in obj) arguments[n++] = obj[m];
      arguments.length = n;
    }
    const strings = [];
    for (let index = arguments.length - 1; index > 0; index--) {
      if (arguments[index].array != undefined) arguments[index] = arguments[index].array.byteOffset;else if (arguments[index].__pointer__ != undefined) arguments[index] = arguments[index].__pointer__;else if (typeof arguments[index] == 'string') {
        arguments[index] = this.__glue__.toWASMString(arguments[index]);
        strings.push(arguments[index]);
      }
    }
    const info = arguments[0];
    arguments[0] = this.__pointer__;
    let r = info.function.apply(this, arguments);
    for (const string of strings) this.__glue__.free(string);
    r = this.__glue__.returnPointerToView(r, info.returnPointerType);
    return r;
  }
  invokeFunction() {
    if (arguments.length == 1 && typeof arguments[0] == 'object') {
      const obj = arguments[0];
      let n = 0;
      for (const m in obj) arguments[n++] = obj[m];
      arguments.length = n;
    }
    const strings = [];
    for (let index = arguments.length - 1; index >= 0; index--) {
      if (arguments[index].array != undefined) arguments[index] = arguments[index].array.byteOffset;else if (arguments[index].__pointer__ != undefined) arguments[index] = arguments[index].__pointer__;else if (typeof arguments[index] == 'string') {
        arguments[index] = this.glue.toWASMString(arguments[index]);
        strings.push(arguments[index]);
      }
    }
    let r = this.apply(this, arguments);
    for (const string of strings) this.glue.free(string);
    r = this.glue.returnPointerToView(r, this.returnPointerType);
    return r;
  }
  invokeExportedFunction() {
    let r = this.apply(this, arguments);
    if (r.array !== undefined) r = r.array.byteOffset;
    return r;
  }
  createClass(classnamePointer, classnameLen, sizeofClass) {
    const glue = this,
      classname = glue.toString(classnamePointer, classnameLen);
    const WASM = class {
      constructor() {
        const meta = Object.getPrototypeOf(this).constructor.__meta__;
        if (!meta.hasConstructor) throw meta.name + ' has no constructor';
        this.__class__ = meta.name;
        this.__prev__ = glue.__lastObject__;
        if (glue.__lastObject__ != null) glue.__lastObject__.__next__ = this;
        this.__next__ = null;
        this.__glue__ = glue;
        glue.__lastObject__ = this;
        const args = [].slice.call(arguments);
        args.unshift(glue.malloc(meta.size));
        this.__pointer__ = glue[meta.name + '::' + meta.name].apply(null, args);
        for (const property of meta.properties) glue.createPropertyFromDescriptor(this, property);
        for (const method of meta.methods) this[method.name] = glue.invokeMethod.bind(this, {
          function: glue[method.wasmFunction],
          returnPointerType: method.returnPointerType
        });
      }
      destruct() {
        const meta = Object.getPrototypeOf(this).constructor.__meta__;
        if (meta.hasDestructor) glue[meta.name + '::~' + meta.name](this.__pointer__);
        glue.free(this.__pointer__);
        if (this.__prev__ != null) this.__prev__.__next__ = this.__next__;
        if (this.__next__ != null) this.__next__.__prev__ = this.__prev__;
        Object.getOwnPropertyNames(this).forEach(property => delete this[property]);
        Object.setPrototypeOf(this, null);
      }
    };
    glue.__classUnderConstruction__ = glue.__classes__[classname] = glue[classname] = WASM;
    glue.__classUnderConstruction__.__meta__ = {
      name: classname,
      size: sizeofClass,
      hasConstructor: false,
      hasDestructor: false,
      properties: [],
      methods: [],
      staticProperties: []
    };
    delete glue.__functionsWithNamespace__[classname];
  }
  createConstructor() {
    this.__classUnderConstruction__.__meta__.hasConstructor = true;
  }
  createDestructor() {
    this.__classUnderConstruction__.__meta__.hasDestructor = this.__classUnderConstruction__.__meta__.hasConstructor;
  }
  createClassConstant(nameptr, namelen, value) {
    this.__classUnderConstruction__[this.toString(nameptr, namelen)] = value;
  }
  createConstant(nameptr, namelen, value) {
    this[this.toString(nameptr, namelen)] = value;
  }
  createPropertyFromDescriptor(object, descriptor) {
    const buffer = this.createViewFromType(descriptor.viewType, object.__pointer__ + descriptor.offset, descriptor.viewLength);
    if (descriptor.viewLength > 1) Object.defineProperty(object, descriptor.name, {
      get: function () {
        return buffer.array;
      },
      set: function (value) {
        buffer.array[index] = value;
      },
      configurable: true,
      enumerable: true
    });else Object.defineProperty(object, descriptor.name, {
      get: function () {
        return buffer.array[0];
      },
      set: function (value) {
        buffer.array[0] = value;
      },
      configurable: true,
      enumerable: true
    });
  }
  createProperty(propertynamePointer, propertynameLen, offset, viewType, viewLength) {
    this.__classUnderConstruction__.__meta__.properties.push({
      name: this.toString(propertynamePointer, propertynameLen),
      offset: offset,
      viewType: viewType,
      viewLength: viewLength
    });
  }
  createStaticPropertyFromDescriptor(wasmClass, descriptor) {
    const buffer = this.createViewFromType(descriptor.viewType, descriptor.pointer, descriptor.viewLength);
    if (descriptor.viewLength > 1) Object.defineProperty(wasmClass, descriptor.name, {
      get: function () {
        return buffer.array;
      },
      set: function (value) {
        buffer.array[index] = value;
      },
      configurable: true,
      enumerable: true
    });else Object.defineProperty(wasmClass, descriptor.name, {
      get: function () {
        return buffer.array[0];
      },
      set: function (value) {
        buffer.array[0] = value;
      },
      configurable: true,
      enumerable: true
    });
  }
  createStaticProperty(propertynamePointer, propertynameLen, pointer, viewType, viewLength) {
    const descriptor = {
      name: this.toString(propertynamePointer, propertynameLen),
      pointer: pointer,
      viewType: viewType,
      viewLength: viewLength
    };
    this.__classUnderConstruction__.__meta__.staticProperties.push(descriptor);
    this.createStaticPropertyFromDescriptor(this.__classUnderConstruction__, descriptor);
  }
  createMethod(methodnamePointer, methodnameLen, returnPointerType) {
    const methodname = this.toString(methodnamePointer, methodnameLen);
    this.__classUnderConstruction__.__meta__.methods.push({
      name: methodname,
      wasmFunction: this.__classUnderConstruction__.__meta__.name + '::' + methodname,
      returnPointerType: returnPointerType
    });
  }
  createStaticMethod(methodnamePointer, methodnameLen, returnPointerType) {
    const methodname = this.toString(methodnamePointer, methodnameLen),
      wasmMethodname = this.__classUnderConstruction__.__meta__.name + '::' + methodname;
    this[wasmMethodname].returnPointerType = returnPointerType;
    this[wasmMethodname].glue = this;
    this.__classUnderConstruction__[methodname] = this.invokeFunction.bind(this[wasmMethodname]);
  }
  createFunction(methodnamePointer, methodnameLen, returnPointerType) {
    const methodname = this.toString(methodnamePointer, methodnameLen);
    if (!this[methodname]) {
      // maybe this function is in a namespace
      for (const namespace in this.__functionsWithNamespace__) {
        if (this.__functionsWithNamespace__[namespace][methodname]) {
          this[methodname] = this.__functionsWithNamespace__[namespace][methodname];
          delete this.__functionsWithNamespace__[namespace][methodname];
          break;
        }
      }
      if (!this[methodname]) return;
    }
    this[methodname].returnPointerType = returnPointerType;
    this[methodname].glue = this;
    this[methodname] = this.invokeFunction.bind(this[methodname]);
  }
  exportToWasm(functionName, f) {
    this.__exportsToWasm__[functionName] = this.invokeExportedFunction.bind(f);
  }
  onMemoryGrowth(n) {
    this.linearMemory = this.wasmInstance.exports.memory.buffer;
    if (this.__memorygrowview__.buffer.byteLength < 1) this.updateMemoryViews();
    this.logMemory();
  }
  consolelog(pointer, strlen) {
    console.log(this.toString(pointer, strlen));
  }
  loadFromArrayBuffer(wasmCode, afterWASMLoaded = null) {
    var _this = this;
    return _asyncToGenerator(function* () {
      _this.wasmCode = wasmCode;
      yield WebAssembly.instantiate(wasmCode, {
        wasi_snapshot_preview1: _this.wasi,
        env: _this.__exportsToWasm__
      }).then(_module => {
        _this.wasmInstance = _module.instance;
        _this.wasmInstance.exports._initialize();
        _this.__functions__ = _this.wasmInstance.exports;
        _this.linearMemory = _this.wasmInstance.exports.memory.buffer;
        _this.__memorygrowpointer__ = _this.__functions__.__malloc__(16);
        _this.__memorygrowview__ = new Uint8Array(_this.linearMemory, _this.__memorygrowpointer__, 16);
        _this.__functionsWithNamespace__ = {};
        const outputBuffer = _this.__functions__.__malloc__(1024),
          stringview = new Uint8Array(_this.linearMemory, _this.__functions__.__malloc__(1024), 1024);
        for (const f in _this.__functions__) if (f != '__demangle__') {
          const length = _this.__functions__.__demangle__(_this.toWASMString(f, stringview), outputBuffer);
          if (length > 0) {
            let name = _this.toString(outputBuffer, length);
            const par = name.indexOf('(');
            if (par > 0) name = name.substring(0, par);
            let namespace = name.lastIndexOf('::');
            if (namespace > 0) {
              namespace = name.lastIndexOf('::', namespace - 1);
              if (namespace > 0) name = name.substr(namespace + 2);
            }

            // class members have namespaces removed from this point, but functions not
            const split = name.split('::', 2);
            if (split.length == 2) {
              if (!_this.__functionsWithNamespace__[split[0]]) _this.__functionsWithNamespace__[split[0]] = {};
              _this.__functionsWithNamespace__[split[0]][split[1]] = _this.__functions__[f];
            }
            _this[name] = _this.__functions__[f];
          } else _this[f] = _this.__functions__[f];
        }
        _this.free(outputBuffer);
        _this.free(stringview.byteOffset);
        _this.__functions__.__initialize__();
        delete _this.__functionsWithNamespace__;
        _this.logMemory();
        _this.__classUnderConstruction__ = null;
        if (afterWASMLoaded != null) afterWASMLoaded.afterWASMLoaded();
      });
    })();
  }
  toString(pointer, strlen = 0) {
    let view = null;
    if (strlen < 1) {
      const viewLength = Math.min(16384, this.linearMemory.byteLength - pointer);
      view = new Uint8Array(this.linearMemory, pointer, viewLength);
      for (strlen = 0; strlen < viewLength; strlen++) if (view[strlen] == 0) break;
    } else view = new Uint8Array(this.linearMemory, pointer, strlen);
    let str = '',
      i = 0,
      bytesNeeded,
      codePoint;
    while (i < strlen) {
      const octet = view[i];
      bytesNeeded = codePoint = 0;
      if (octet <= 0x7f) {
        bytesNeeded = 0;
        codePoint = octet & 0xff;
      } else if (octet <= 0xdf) {
        bytesNeeded = 1;
        codePoint = octet & 0x1f;
      } else if (octet <= 0xef) {
        bytesNeeded = 2;
        codePoint = octet & 0x0f;
      } else if (octet <= 0xf4) {
        bytesNeeded = 3;
        codePoint = octet & 0x07;
      }
      if (strlen - i - bytesNeeded > 0) {
        for (let k = 0; k < bytesNeeded; k++) codePoint = codePoint << 6 | view[i + k + 1] & 0x3f;
      } else {
        codePoint = 0xfffd;
        bytesNeeded = strlen - i;
      }
      str += String.fromCodePoint(codePoint);
      i += bytesNeeded + 1;
    }
    return str;
  }
  toWASMString(str, view = null) {
    const length = str.length,
      maxBytes = length * 4 + 1;
    let i = 0,
      c,
      bits,
      destination = 0;
    if (view == null) view = new Uint8Array(this.linearMemory, this.malloc(maxBytes), maxBytes);
    while (i < length) {
      const codePoint = str.codePointAt(i);
      c = bits = 0;
      if (codePoint <= 0x0000007f) {
        c = 0;
        bits = 0x00;
      } else if (codePoint <= 0x000007ff) {
        c = 6;
        bits = 0xc0;
      } else if (codePoint <= 0x0000ffff) {
        c = 12;
        bits = 0xe0;
      } else if (codePoint <= 0x001fffff) {
        c = 18;
        bits = 0xf0;
      }
      view[destination++] = bits | codePoint >> c;
      c -= 6;
      while (c >= 0) {
        view[destination++] = 0x80 | codePoint >> c & 0x3f;
        c -= 6;
      }
      i += codePoint >= 0x10000 ? 2 : 1;
    }
    view[destination] = 0;
    return view.byteOffset;
  }
  logMemory() {
    console.log('WASM memory ' + this.id + ': ' + this.niceSize(this.__functions__.__stacksize__()) + ' stack, ' + this.niceSize(this.linearMemory.byteLength - this.__functions__.__heapbase__()) + ' heap, ' + this.niceSize(this.linearMemory.byteLength) + ' total.');
  }
  malloc(bytes) {
    const pointer = this.__functions__.__malloc__(bytes);
    if (this.__memorygrowview__.buffer.byteLength < 1) this.updateMemoryViews();
    return pointer;
  }
  updateMemoryViews() {
    for (const buffer of this.__views__) this.updateBuffer(buffer, this.linearMemory);
    this.__memorygrowview__ = new Uint8Array(this.linearMemory, this.__memorygrowpointer__, 16);
  }
  free(pointer) {
    this.__functions__.__free__(pointer);
  }
  setInt64(pointer, index, value) {
    this.__functions__.__setint64__(pointer, index, value);
  }
  bufferToWASM(buffer, input, index) {
    let inBufferL = null,
      inBufferR = null;
    if (index === undefined) index = 0;
    if (typeof input.getChannelData === 'function') {
      inBufferL = input.getChannelData(0);
      inBufferR = input.getChannelData(1);
    } else {
      inBufferL = input[index][0];
      inBufferR = input[index][1];
    }
    const arr = buffer.constructor === Array ? buffer[index].array : buffer.array,
      to = arr.length;
    for (let n = 0, i = 0; n < to; n++, i++) {
      arr[n++] = inBufferL[i];
      arr[n] = inBufferR[i];
    }
  }
  bufferToJS(buffer, output, index) {
    let outBufferL = null,
      outBufferR = null;
    if (index === undefined) index = 0;
    if (typeof output.getChannelData === 'function') {
      outBufferL = output.getChannelData(0);
      outBufferR = output.getChannelData(1);
    } else {
      outBufferL = output[index][0];
      outBufferR = output[index][1];
    }
    const arr = buffer.constructor === Array ? buffer[index].array : buffer.array,
      to = arr.length;
    for (let n = 0, i = 0; n < to; n++, i++) {
      outBufferL[i] = arr[n++];
      outBufferR[i] = arr[n];
    }
  }
  arrayBufferToWASM(arrayBuffer, offset = 0) {
    const pointer = this.malloc(arrayBuffer.byteLength + offset);
    new Uint8Array(this.linearMemory).set(new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength), pointer + offset);
    return pointer;
  }
  copyWASMToArrayBuffer(pointer, lengthBytes) {
    const arrayBuffer = new ArrayBuffer(lengthBytes);
    new Uint8Array(arrayBuffer, 0, lengthBytes).set(new Uint8Array(this.linearMemory, pointer, lengthBytes));
    return arrayBuffer;
  }
  moveWASMToArrayBuffer(pointer, lengthBytes) {
    const arrayBuffer = this.copyWASMToArrayBuffer(pointer, lengthBytes);
    this.free(pointer);
    return arrayBuffer;
  }
  static loaderWorkerMain(url) {
    return _asyncToGenerator(function* () {
      SuperpoweredGlue.__uint_max__sp__ = 255;
      const Superpowered = yield SuperpoweredGlue.Instantiate('');
      yield fetch(url).then(response => response.arrayBuffer()).then(audiofileArrayBuffer => {
        // Copy the ArrayBuffer to WebAssembly Linear Memory.
        const audiofileInWASMHeap = Superpowered.arrayBufferToWASM(audiofileArrayBuffer);

        // Decode the entire file.
        const decodedAudio = Superpowered.Decoder.decodeToAudioInMemory(audiofileInWASMHeap, audiofileArrayBuffer.byteLength);

        // Copy the pcm audio from the WebAssembly heap into a regular ArrayBuffer that can be transfered.
        const arrayBuffer = Superpowered.moveWASMToArrayBuffer(decodedAudio, Superpowered.AudioInMemory.getSize(decodedAudio) * 4);

        // Transfer the ArrayBuffer.
        if (typeof self.transfer !== 'undefined') self.transfer(url, arrayBuffer);else postMessage({
          '__transfer__': arrayBuffer
        }, [arrayBuffer]);
      });
    })();
  }
  static loaderWorkerOnmessage(message) {
    if (typeof message.data.load === 'string') SuperpoweredGlue.loaderWorkerMain(message.data.load);
  }
  registerTrackLoader(receiver) {
    if (typeof receiver.terminate !== 'undefined') receiver.addEventListener('message', this.handleTrackLoaderMessage); // Worker
    return this.trackLoaderReceivers.push(typeof receiver.port !== 'undefined' ? receiver.port : receiver) - 1;
  }
  handleTrackLoaderMessage(message) {
    if (typeof message.data.SuperpoweredLoad !== 'string') return false;
    this.loadTrackInWorker(message.data.SuperpoweredLoad, message.data.trackLoaderID);
    return true;
  }
  loadTrackInWorker(url, trackLoaderID) {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      let source = null;
      if (SuperpoweredGlue.SuperpoweredGlueSourceURL != null) {
        const response = yield fetch(SuperpoweredGlue.SuperpoweredGlueSourceURL);
        source = yield response.text();
      }
      if (source == null) source = SuperpoweredGlue.toString();
      const trackLoaderWorker = new Worker(URL.createObjectURL(new Blob([source + "\r\n\r\nonmessage = SuperpoweredGlue.loaderWorkerOnmessage;"], {
        type: 'application/javascript'
      })));
      trackLoaderWorker.__url__ = url;
      trackLoaderWorker.trackLoaderID = trackLoaderID;
      trackLoaderWorker.ontransfer = function (message) {
        this.transferLoadedTrack(message.transfer, trackLoaderWorker);
      }.bind(_this2);
      trackLoaderWorker.onmessage = function (message) {
        this.transferLoadedTrack(message.data.__transfer__, trackLoaderWorker);
      }.bind(_this2);
      if (typeof window !== 'undefined' && typeof window.location !== 'undefined' && typeof window.location.origin !== 'undefined') url = new URL(url, window.location.origin).toString();
      trackLoaderWorker.postMessage({
        load: url
      });
    })();
  }
  transferLoadedTrack(arrayBuffer, trackLoaderWorker) {
    const receiver = this.trackLoaderReceivers[trackLoaderWorker.trackLoaderID];
    if (receiver == null) return;
    if (typeof receiver.postMessage === 'function') receiver.postMessage({
      SuperpoweredLoaded: {
        buffer: arrayBuffer,
        url: trackLoaderWorker.__url__
      }
    }, [arrayBuffer]);else receiver({
      SuperpoweredLoaded: {
        buffer: arrayBuffer,
        url: trackLoaderWorker.__url__
      }
    });
    trackLoaderWorker.terminate();
  }
  downloadAndDecode(url, obj) {
    if (obj.trackLoaderID === undefined) return;
    if (typeof obj.onMessageFromMainScope === 'function' && typeof obj.sendMessageToMainScope === 'function') obj.sendMessageToMainScope({
      SuperpoweredLoad: url,
      trackLoaderID: obj.trackLoaderID
    });else this.loadTrackInWorker(url, obj.trackLoaderID);
  }
}
_defineProperty(SuperpoweredGlue, "wasmbin", "data:@file/octet-stream;base64,\
_defineProperty(SuperpoweredGlue, "SuperpoweredGlueSourceURL", null);
class SuperpoweredWebAudio {
  constructor(minimumSamplerate, superpowered) {
    //SuperpoweredWebAudio.AudioWorkletHasBrokenModuleImplementation = (navigator.userAgent.indexOf('AppleWebKit') > -1) || (navigator.userAgent.indexOf('Firefox') > -1);
    //SuperpoweredWebAudio.AudioWorkletHasBrokenModuleImplementation = (navigator.userAgent.indexOf('Firefox') > -1);
    //if (SuperpoweredWebAudio.AudioWorkletHasBrokenModuleImplementation && (navigator.userAgent.indexOf('Chrome') > -1)) SuperpoweredWebAudio.AudioWorkletHasBrokenModuleImplementation = false;
    this.Superpowered = superpowered;
    this.audioContext = null;
    const AudioContext = window.AudioContext || window.webkitAudioContext || false;
    let c = new AudioContext();
    if (c.sampleRate < minimumSamplerate) {
      c.close();
      c = new AudioContext({
        sampleRate: minimumSamplerate
      });
    }
    this.audioContext = c;
  }
  getUserMediaForAudio(constraints, onPermissionGranted, onPermissionDenied) {
    let finalConstraints = {};
    if (navigator.mediaDevices) {
      const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
      for (const constraint in supportedConstraints) if (supportedConstraints.hasOwnProperty(constraint) && constraints[constraint] !== undefined) finalConstraints[constraint] = constraints[constraint];
    }
    finalConstraints.audio = true;
    finalConstraints.video = false;
    navigator.fastAndTransparentAudio = constraints.hasOwnProperty('fastAndTransparentAudio') && constraints.fastAndTransparentAudio === true;
    if (navigator.fastAndTransparentAudio) {
      finalConstraints.echoCancellation = false;
      finalConstraints.disableLocalEcho = false;
      finalConstraints.autoGainControl = false;
      finalConstraints.audio = {
        mandatory: {
          googAutoGainControl: false,
          googAutoGainControl2: false,
          googEchoCancellation: false,
          googNoiseSuppression: false,
          googHighpassFilter: false,
          googEchoCancellation2: false,
          googNoiseSuppression2: false,
          googDAEchoCancellation: false,
          googNoiseReduction: false
        }
      };
    }
    ;
    navigator.getUserMediaMethod = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (navigator.getUserMediaMethod) navigator.getUserMediaMethod(finalConstraints, onPermissionGranted, onPermissionDenied);else {
      let userMedia = null;
      try {
        userMedia = navigator.mediaDevices.getUserMedia;
      } catch (error) {
        if (location.protocol.toLowerCase() != 'https' && location.hostname.toLowerCase() != 'localhost') onPermissionDenied("Web Audio requires a secure context (HTTPS or localhost).");else onPermissionDenied(error);
        userMedia = null;
      }
      if (userMedia != null) {
        if (userMedia) navigator.mediaDevices.getUserMedia(finalConstraints).then(onPermissionGranted).catch(onPermissionDenied);else onPermissionDenied("Can't access getUserMedia.");
      }
    }
  }
  getUserMediaForAudioAsync(constraints) {
    var _this3 = this;
    return _asyncToGenerator(function* () {
      return new Promise((resolve, reject) => {
        _this3.getUserMediaForAudio(constraints, function (stream) {
          if (navigator.fastAndTransparentAudio) {
            const audioTracks = stream.getAudioTracks();
            for (const audioTrack of audioTracks) audioTrack.applyConstraints({
              autoGainControl: false,
              echoCancellation: false,
              noiseSuppression: false
            });
          }
          resolve(stream);
        }, reject);
      });
    })();
  }
  createAudioNodeAsync(url, className, onMessageFromAudioScope, numInputs, numOutputs) {
    var _this4 = this;
    return _asyncToGenerator(function* () {
      if (numInputs === undefined) numInputs = 1;
      if (numOutputs === undefined) numOutputs = 1;
      return new Promise((resolve, reject) => _this4.createAudioNode(url, className, resolve, onMessageFromAudioScope, numInputs, numOutputs));
    })();
  }
  createAudioNode(url, className, callback, onMessageFromAudioScope, numInputs, numOutputs) {
    if (!SuperpoweredWebAudio.AudioWorkletHasBrokenModuleImplementation && typeof AudioWorkletNode === 'function') {
      if (numInputs === undefined) numInputs = 1;
      if (numOutputs === undefined) numOutputs = 1;
      this.audioContext.audioWorklet.addModule(url).then(() => {
        const node = new AudioWorkletNode(this.audioContext, className, {
          processorOptions: {
            wasmCode: this.Superpowered.wasmCode,
            samplerate: this.audioContext.sampleRate,
            maxChannels: this.Superpowered.__maxChannels__,
            numberOfInputs: numInputs,
            numberOfOutputs: numOutputs,
            trackLoaderID: this.Superpowered.trackLoaderReceivers.length
          },
          numberOfInputs: numInputs,
          numberOfOutputs: numOutputs,
          outputChannelCount: Array(numOutputs).fill(2)
        });
        node.trackLoaderID = this.Superpowered.registerTrackLoader(node);
        node.Superpowered = this.Superpowered;
        node.onReadyCallback = callback;
        node.onMessageFromAudioScope = onMessageFromAudioScope;
        node.destruct = function () {
          node.Superpowered.trackLoaderReceivers[node.trackLoaderID] = null;
          node.port.postMessage('___superpowered___destruct___');
        };
        node.sendMessageToAudioScope = function (message, transfer = []) {
          node.port.postMessage(message, transfer);
        };
        node.port.onmessage = function (event) {
          if (node.Superpowered.handleTrackLoaderMessage(event)) return;
          if (event.data == '___superpowered___onready___') {
            node.state = 1;
            node.onReadyCallback(node);
          } else node.onMessageFromAudioScope(event.data);
        }.bind(node);
      });
    } else {
      import( /* webpackIgnore: true */url).then(processorModule => {
        const node = this.audioContext.createScriptProcessor(1024, 2, 2);
        node.trackLoaderID = this.Superpowered.registerTrackLoader(node);
        node.samplerate = this.audioContext.sampleRate;
        node.inputBuffer = this.Superpowered.createFloatArray(1024 * 2);
        node.outputBuffer = this.Superpowered.createFloatArray(1024 * 2);
        node.processor = new processorModule.default(this.Superpowered, onMessageFromAudioScope, node.samplerate);
        node.sendMessageToAudioScope = function (message, transfer = 0) {
          node.processor.onMessageFromMainScope(message);
        };
        node.destruct = function () {
          node.processor.Superpowered.trackLoaderReceivers[node.trackLoaderID] = null;
          node.processor.state = -1;
          node.processor.onDestruct();
        };
        node.onaudioprocess = function (e) {
          node.processor.Superpowered.bufferToWASM(node.inputBuffer, e.inputBuffer);
          if (node.processor.state > 0) node.processor.processAudio(node.inputBuffer, node.outputBuffer, node.inputBuffer.array.length / 2);
          node.processor.Superpowered.bufferToJS(node.outputBuffer, e.outputBuffer);
        };
        node.processor.state = 1;
        callback(node);
      });
    }
  }
}
_defineProperty(SuperpoweredWebAudio, "AudioWorkletHasBrokenModuleImplementation", false);
if (!SuperpoweredWebAudio.AudioWorkletHasBrokenModuleImplementation && typeof AudioWorkletProcessor === 'function') {
  class SuperpoweredAudioWorkletProcessor extends AudioWorkletProcessor {
    constructor(options) {
      super();
      SuperpoweredGlue.__uint_max__sp__ = options.processorOptions.maxChannels;
      this.trackLoaderID = options.processorOptions.trackLoaderID;
      this.state = 0;
      this.port.onmessage = event => {
        if (event.data == '___superpowered___destruct___') {
          this.state = -1;
          this.onDestruct();
        } else this.onMessageFromMainScope(event.data);
      };
      this.samplerate = options.processorOptions.samplerate;
      this.Superpowered = new SuperpoweredGlue();
      this.Superpowered.loadFromArrayBuffer(options.processorOptions.wasmCode, this);
      this.numberOfInputs = options.processorOptions.numberOfInputs;
      this.numberOfOutputs = options.processorOptions.numberOfOutputs;
    }
    afterWASMLoaded() {
      this.Superpowered.Initialize();
      this.inputBuffers = [];
      for (let n = this.numberOfInputs; n > 0; n--) this.inputBuffers.push(this.Superpowered.createFloatArray(128 * 2));
      this.outputBuffers = [];
      for (let n = this.numberOfOutputs; n > 0; n--) this.outputBuffers.push(this.Superpowered.createFloatArray(128 * 2));
      this.onReady();
      this.port.postMessage('___superpowered___onready___');
      this.state = 1;
    }
    onReady() {}
    onDestruct() {}
    onMessageFromMainScope(message) {}
    sendMessageToMainScope(message) {
      this.port.postMessage(message);
    }
    processAudio(buffer, parameters) {}
    process(inputs, outputs, parameters) {
      if (this.state < 0) return false;
      if (this.state == 1) {
        for (let n = this.numberOfInputs - 1; n >= 0; n--) {
          if (inputs[n].length > 1) this.Superpowered.bufferToWASM(this.inputBuffers, inputs, n);else this.Superpowered.memorySet(this.inputBuffers[n].pointer, 0, 128 * 8);
        }
        this.processAudio(this.numberOfInputs == 1 ? this.inputBuffers[0] : this.inputBuffers, this.numberOfOutputs == 1 ? this.outputBuffers[0] : this.outputBuffers, 128, parameters);
        for (let n = this.numberOfOutputs - 1; n >= 0; n--) {
          if (outputs[n].length > 1) this.Superpowered.bufferToJS(this.outputBuffers, outputs, n);
        }
      }
      return true;
    }
  }
  SuperpoweredWebAudio.AudioWorkletProcessor = SuperpoweredAudioWorkletProcessor;
} else {
  class SuperpoweredAudioWorkletProcessor {
    constructor(sp, oma, sr) {
      _defineProperty(this, "onMessageFromAudioScope", null);
      this.Superpowered = sp;
      this.samplerate = sr;
      this.onMessageFromAudioScope = oma;
      this.state = 0;
      this.onReady();
    }
    onReady() {}
    onDestruct() {}
    onMessageFromMainScope(message) {}
    sendMessageToMainScope(message) {
      if (!this.Superpowered.handleTrackLoaderMessage({
        data: message
      })) this.onMessageFromAudioScope(message);
    }
    postMessage(message, transfer = []) {
      this.onMessageFromMainScope(message);
    }
    processAudio(buffer, parameters) {}
  }
  SuperpoweredWebAudio.AudioWorkletProcessor = SuperpoweredAudioWorkletProcessor;
}
if (true) module.exports = {
  SuperpoweredGlue,
  SuperpoweredWebAudio
};else {}
if (typeof globalThis !== 'undefined') {
  globalThis.SuperpoweredGlue = SuperpoweredGlue;
  globalThis.SuperpoweredWebAudio = SuperpoweredWebAudio;
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4913)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map