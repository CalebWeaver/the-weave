import {AfterViewInit, Component, Input, OnInit, Output, ViewChildren} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CastingService} from '../services/casting.service';
import {Spell} from '../classes/spell';

@Component({
  selector: 'app-spell-input',
  templateUrl: './spell-input.component.html',
  styleUrls: ['./spell-input.component.scss'],
  animations: [trigger('newCast', [
    state('casting', style({
      opacity: 0,
    })),
    state('castComplete', style({
      opacity: 1,
    })),
    transition('casting => castComplete', [
      animate('1s')
    ]),
    transition('castComplete => casting', [
      animate('0s')
    ])
  ])]
})
export class SpellInputComponent implements OnInit {

  spell = new Spell();
  result: string;
  isCasting = false;

  constructor(private caster: CastingService) {}

  ngOnInit() {}

  public cast(): void {
    this.isCasting = true;
    this.result = this.caster.cast(this.spell);
    setTimeout(() => this.isCasting = false, 1);
  }

  public handleSpellInput(event: KeyboardEvent): void {
    const target = event.target as HTMLTextAreaElement;

    this.spell.read(target.value);
    target.value = this.spell.toString();
  }
}
