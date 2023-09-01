import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YammerLoginComponent } from './login/login.component'; // Import your login component
import { YammerAuthCallbackComponent } from './callback/callback.component';
import { YammerFeedComponent } from './feed/feed.component'; // Import your auth callback component

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: YammerLoginComponent },
  { path: 'feed', component: YammerAuthCallbackComponent },
  { path: 'data', component: YammerFeedComponent},
  // Define other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
