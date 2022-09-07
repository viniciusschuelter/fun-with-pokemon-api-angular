import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonTypeComponent} from './pokemon-type.component';
import {SharedModule} from "../../../modules/shared_modules/shared.module";
import {AwesomeTooltipModule} from '../../../directives/tooltip/tooltip.module';


@NgModule({
  declarations: [PokemonTypeComponent],
  exports: [PokemonTypeComponent],
    imports: [
        CommonModule,
        SharedModule,
        AwesomeTooltipModule
    ]
}) export class PokemonTypeModule { }
