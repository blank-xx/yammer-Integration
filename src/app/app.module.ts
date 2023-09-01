import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YammerLoginComponent } from './login/login.component';
import { YammerAuthCallbackComponent } from './callback/callback.component';
import { YammerFeedComponent } from './feed/feed.component';

@NgModule({
  declarations: [
    AppComponent,
    YammerLoginComponent,
    YammerAuthCallbackComponent,
    YammerFeedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
