import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './login/login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { MapComponent } from './map/map.component';
import { HometownComponent } from './hometown/hometown.component';
import { AngularFirestore } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    HometownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, '0toappin30'),
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey
    })
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
