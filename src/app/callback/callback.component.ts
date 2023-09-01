import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-yammer-auth-callback',
  template: 'Authenticating...',
})
export class YammerAuthCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private router: Router, // Inject Router
    private location: Location) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: string | null) => {
      if (fragment) {
        const accessToken = this.getAccessTokenFromFragment(fragment);
        if (accessToken) {
          // You have the access token, store it or use it as needed
          localStorage.setItem('access_token', accessToken);
          console.log('Access Token:', accessToken);
          this.router.navigateByUrl('/data');
        } else {
          console.error('No access token found in the fragment.');
        }
      } else {
        console.error('Authentication failed. No fragment received.');
      }
    });
  }

  private getAccessTokenFromFragment(fragment: string): string | null {
    const tokenParam = 'access_token=';
    const tokenStartIndex = fragment.indexOf(tokenParam);
    if (tokenStartIndex !== -1) {
      const tokenEndIndex = fragment.indexOf('&', tokenStartIndex);
      if (tokenEndIndex !== -1) {
        return fragment.substring(
          tokenStartIndex + tokenParam.length,
          tokenEndIndex
        );
      } else {
        // If the access token is at the end of the fragment
        return fragment.substring(tokenStartIndex + tokenParam.length);
      }
    }
    return null;
  }
}
