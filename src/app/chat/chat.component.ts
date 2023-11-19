import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import Pusher from 'pusher-js';

interface Message {
  username: string;
  message: string;
  isSentByCurrentUser?: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: string | null = null;
  message = '';
  messages: Message[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.username = this.getUsername();
    this.verifyUsername();
    const pusher = new Pusher('69dc44f1de2cdb72c1e2', {
      cluster: 'sa1'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: Message) => {
      this.ngZone.run(() => {
        data.isSentByCurrentUser = data.username === this.username;
        this.messages.push(data);
      });
    });
  
  }

  private getUsername(): string | null {
    return localStorage.getItem('username');
  }

  private verifyUsername(): void {
    if (!this.username) {
      const errorMessage = 'Username não informado';
      this.router.navigate([''], { queryParams: { error: errorMessage } });
    }
  }

  submit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
  
    const newMessage: Message = {
      username: this.username!,
      message: this.message,
      isSentByCurrentUser: true
    };
  
    this.http.post('http://localhost:8000/api/messages', newMessage)
      .subscribe(() => {
      });
  }
  
  
}
