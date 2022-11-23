import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from 'src/app/components/shared/error/error.component';
import { NoDataComponent } from 'src/app/components/shared/no-data/no-data.component';
import { FormsModule } from '@angular/forms';
import {LoadingComponent} from '../../components/loading/loading.component';

@NgModule({
  declarations: [ErrorComponent, NoDataComponent],
  imports: [CommonModule, FormsModule, LoadingComponent],
  exports: [ErrorComponent, NoDataComponent]
})
export class SharedModule {}
