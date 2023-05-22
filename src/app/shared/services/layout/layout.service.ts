import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isCollapsed = false;
  isCollapsedEventer: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
}
