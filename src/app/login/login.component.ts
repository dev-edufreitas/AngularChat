import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.errorMessage = params['error'] || '';
      if (this.errorMessage) {
        this.clearErrorMessageAfterDelay();
      }
    });
  }

  enterChat() {
    if (this.username.trim() === '') {
      this.errorMessage = 'Username não informado';
      this.clearErrorMessageAfterDelay();
    } else {
      localStorage.setItem('username', this.username);
      this.router.navigate(['chat']);
    }
  }

  private clearErrorMessageAfterDelay() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 2000);
  }
}
