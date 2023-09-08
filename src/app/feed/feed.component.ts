import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, throttleTime } from 'rxjs/operators';
@Component({
  selector: 'app-yammer-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class YammerFeedComponent implements OnInit {
  private yammerFeedUrl =
    '/api/v1/messages/my_feed.json?threaded=true&threaded=extended&limit=5';
  private accessToken: string | null = null;
  public feedData: any = {};
  constructor(private http: HttpClient) {}

  finalfeed: any = [];

  startRendering: boolean = false;

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token');
    console.log('Access token is : ', this.accessToken);

    // Make the API call to fetch the Yammer feed
    if (this.accessToken) {
      this.getAllfeed().then((feed) => {
        feed.messages.forEach(async (element: any) => {
          let name: any = await this.getname(element.sender_id);
          let Images: any = [];
          element.attachments.forEach(async (item: any) => {
            let images: any = await item.download_url;
            Images.push({ images:images });
          });
          console.log(Images);
          const publishedDate = new Date(element.published_at);
          const formattedDate = this.formatDate(publishedDate);
          this.finalfeed.push({
            name: name.full_name,
            description: element.body.plain,
            Images: Images,
            dp: name.mugshot_url,
            published_at:formattedDate,
            likes:element.liked_by.count
          });
        });
        this.startRendering = true;
      });
    }
  }

  getAllfeed(): Promise<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
    return new Promise((resolve, reject) => {
      this.http.get(this.yammerFeedUrl, { headers }).subscribe({
        next: (v: any) => {
          console.log('v is : ', v);
          resolve(v);
        },
        error: (e: any) => {
          reject(e);
        },
      });
    });
  }

  getname(id: string): Promise<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
    return new Promise((resolve, reject) => {
      this.http.get(`api/v1/users/${id}.json`, { headers }).subscribe({
        next: (v: any) => {
          console.log('user is : ', v);
          resolve(v);
        },
        error: (e: any) => {
          reject(e);
        },
      });
    });
  }
  getimages(id: string): Promise<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
    return new Promise((resolve, reject) => {
      this.http.get(`api/v1/uploaded_files/${id}`, { headers }).subscribe({
        next: (v: any) => {
          console.log('image is : ', v);
          resolve(v);
        },
        error: (e: any) => {
          reject(e);
        },
      });
    });
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight as 12 AM
  
    const formattedDate = `${day}/${month}/${year}     ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  
    return formattedDate;
  }
}

/*getImage(imageId: string): Observable<string> {
    const proxyUrl = `api/v1/uploaded_files/${imageId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
    return this.http.get(proxyUrl, { headers }).pipe(
      map((response: any) => response.url),
      catchError((error) => {
        console.error('Error fetching image details:', error);
        return of('Unknown User');
      })
    );
  }*/

/*private fetchYammerFeed(): void {
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
      }
    );
  }*/

/*getname(id: string): Observable<string>{
    const proxyurl = `api/v1/users/${id}.json`
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });

    return this.http.get(proxyurl, { headers }).pipe(
      map((response: any) => response.full_name),
      catchError((error) => {
        console.error('Error fetching user details:', error);
        return of('Unknown User');
      }),
      throttleTime(3000)
    );
  }*/
