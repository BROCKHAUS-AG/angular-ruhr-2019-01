import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { MouseEvent } from '@agm/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent {

  // center map over Ruhrgebiet
  lat = 51;
  lng = 7;

  markers$: Observable<MapMarker[]>;

  constructor(
    public userService: UserService,
    private afs: AngularFirestore
  ) {
    this.markers$ = afs.collection<MapMarker>('hometowns').valueChanges();
  }

  setHometown(event: MouseEvent) {
    this.userService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        const marker: MapMarker = {
          lat: event.coords.lat,
          lng: event.coords.lng,
          label: this.userService.currentUser.displayName,
          photoUrl: this.userService.currentUser.photoURL
        };
        this.afs.doc(`hometowns/${this.userService.currentUser.uid}`).set(marker);
      }
    });
  }
}

export interface MapMarker {
  lat: number;
  lng: number;
  label: string;
  photoUrl: string;
}
