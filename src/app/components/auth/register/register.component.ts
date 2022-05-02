import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {User} from 'src/app/models/interfaces';
import {AuthService} from 'src/app/services/auth.service';
import {UsersService} from 'src/app/services/users.service';
import fadeAnimation from 'src/app/animations/fade.animation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeAnimation],
})
export class RegisterComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  isShown = false;
  user: User;
  isError: string;
  isLoading: boolean;
  confirmPasswordError = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private usersService: UsersService
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isShown = true;
    }, 500);
    this.isError = null;
    this.isLoading = false;

    this.user = {
      name: null,
      email: null,
      password: null,
    };
  }

  public checkPassword(e: Event) {
    const password = this.form.value.password;
    const confirm_new_password = (e.target as any).value;

    if (password !== undefined) {
      if (confirm_new_password !== password) {
        this.confirmPasswordError = true;
      } else {
        this.confirmPasswordError = false;
      }
    }
  }


  public onSubmit(form: NgForm) {
    this.isLoading = true;
    this.isError = null;
    const name = form.value.name.trim();
    const email = form.value.email.trim();
    const password = form.value.password.trim();


    this.auth
      .signUp(email, password)
      .then((response) => {
        if (response.user.uid) {
          const newUser = {
            uid: response.user.uid,
            name,
            email,
            joind_date: new Date(),
          };
          this.usersService.addNewUser(newUser).subscribe(
            () => {
              this.isLoading = false;
              this.router.navigate(['/']);
            },
            (error) => {
              this.isLoading = false;
              this.isError = error;
            }
          );
        }
      })
      .catch((error) => {
        this.isLoading = false;
        this.isError = error.error?.message
          ? error.error?.message
          : error.message;
      });
  }
}
