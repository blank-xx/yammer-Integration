import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-yammer-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class YammerFeedComponent implements OnInit {
  private yammerFeedUrl = '/api/v1/messages/my_feed.json';
  private accessToken: string | null = null;
  public feedData: any; // Define the type according to your API response structure

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Retrieve the access token from local storage
    this.accessToken = localStorage.getItem('access_token');
    console.log("Access token is : ",this.accessToken);

    // Make the API call to fetch the Yammer feed
    if (this.accessToken) {
      this.fetchYammerFeed();
    }
  }

  private fetchYammerFeed(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });

    this.http.get(this.yammerFeedUrl, { headers }).subscribe(
      (response: any) => {
        this.feedData = response; // Store the feed data for display
        console.log('Yammer Feed Data:', this.feedData);
      },
      (error) => {
        console.error('Error fetching Yammer feed:', error);
        // Handle the error appropriately (e.g., display an error message)
      }
    );
  }
}
