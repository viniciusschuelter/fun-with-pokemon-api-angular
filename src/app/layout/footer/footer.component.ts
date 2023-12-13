import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  template: `
    <footer class="footer bg-white py-5">
      <div class="container">
        <div class="row row-cols-1 row-cols-md-2">
          <div
            class="footer-left col d-flex justify-content-md-start justify-content-center align-items-center"
          >
            <img
              src="../../../assets/images/Logo.png"
              alt="logo-footer"
              height="50px"
              class="logo"
            />
            <p class="text-black ms-4 text-capitalize">
              copyright 2023 fun with pokeapi, LLC.
            </p>
          </div>
          <div class="col">
            <section
              class="d-flex justify-content-md-end justify-content-center text-secondary align-items-center"
            >
              <i class="fa fa-twitter-square h1" aria-hidden="true"></i>
              <i class="fa fa-facebook-official h1" aria-hidden="true"></i>
              <i class="fa fa-instagram h1" aria-hidden="true"></i>

              <div class="ms-5 mb-1">
                <a
                  class="github-button"
                  href="https://github.com/viniciusschuelter"
                  data-color-scheme="no-preference: dark; light: dark; dark: dark;"
                  data-size="large"
                  aria-label="Follow @viniciusschuelter on GitHub"
                >
                  Follow
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .fa-facebook-official {
        margin: 0 20px;
        padding-bottom: 8px;
      }
      .fa {
        font-size: 2.2rem;
      }
      .footer-left {
        position: relative;
        .logo-footer {
          position: absolute;
          width: 65px;
          height: 20px;
          top: 37px;
          left: 13px;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {}
