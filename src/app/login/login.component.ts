import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yammer-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class YammerLoginComponent {
  private clientId = 'bj22jSHSKic6CR0tXqtI3g';
  private redirectUri = 'http://localhost:4200/feed';
  private authUrl = `https://www.yammer.com/dialog/oauth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=token`;

  constructor(private router: Router) {}

  startYammerAuthentication(): void {
    window.location.href = this.authUrl;
  }
}
