// scene-manager.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SceneState = 'HERO' | 'SERVICES' | 'ABOUT' | 'PROCESS' | 'CONTACT';

@Injectable({ providedIn: 'root' })
export class SceneManagerService {
  private currentState = new BehaviorSubject<SceneState>('HERO');
  currentState$ = this.currentState.asObservable();

  updateState(state: SceneState) {
    this.currentState.next(state);
  }
}