import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-soon',
  templateUrl: './soon.component.html',
  styleUrls: ['./soon.component.scss'],
})
export class SoonComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 5000);
  }
}
