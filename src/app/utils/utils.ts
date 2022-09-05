import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';


export function handleErrors(error: HttpErrorResponse) {
  let err = 'Something wrong!';
  if (error) {
    err = error.error?.message || error?.message;
    this.toastr.error(err, 'Error');
    return throwError(err);
  } else {
    return throwError(err);
  }
}
