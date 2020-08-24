import { Injectable } from '@angular/core';
import {Runes, Quantities} from '../assets/Runes';
import {Spell} from './spell';
import SpellError from './SpellError';

const quantities = {
};

@Injectable({
  providedIn: 'root'
})
export class CastingService {

  constructor() { }

  public cast(spell: Spell): string {
    try {
      const tecLimit = this.getThermalEnergyConfluxLimit(spell);
      console.log(tecLimit);
      if (tecLimit > 50) {
        return 'A roar of fire engulfs everything around you';
      } else if (tecLimit > 20) {
        return 'Flame spouts around you';
      } else if (tecLimit > 0) {
        return 'The air gets warmer';
      }
    } catch (ex) {
      console.log(ex);
      if (ex.name === 'SpellError') {
        return ex.message;
      }
    }
    return 'Nothing happens';
  }

  public getThermalEnergyConfluxLimit(spell: Spell): number {
    let tecLimit = 0;

    const lowIndex = spell.indexOf(Runes.uvar.glyph);
    const highIndex = spell.indexOf(Runes.ravu.glyph);

    if (lowIndex > -1
      && highIndex > -1) {
      if (lowIndex < highIndex) {
        tecLimit = this.getQuantity(spell.slice(lowIndex + 1, highIndex));
      } else {
        tecLimit = this.getQuantity(spell.slice(lowIndex + 1, highIndex)) * -1;
        throw new SpellError('The air bites and frost clings to each part of your body. Take 1d4 cold damage.');
      }
    }

    return tecLimit;
  }

  public getThermalHarness(spell: Spell) {
    const lowIndex = spell.indexOf(Runes.brans.glyph);
    const highIndex = spell.indexOf(Runes.snarb.glyph);

    if (lowIndex > -1
      && highIndex > -1) {
      const thermalHarness = this.getQuantity(spell.slice(lowIndex + 1, highIndex));
    }
  }

  getQuantity(spell: Spell): number {
    let total = 0;
    let previousRuneAmount = 0;
    if (spell) {
      spell.map(rune => {
        if (Quantities.includes(rune)) {
          const runeInfo = Runes[rune];
          if (previousRuneAmount < runeInfo.qty) {
            total -= previousRuneAmount;
            total += runeInfo.qty - previousRuneAmount;
          } else {
            total += runeInfo.qty;
          }
          previousRuneAmount = runeInfo.qty;
        } else {
          return total;
        }
      });
    }

    return total;
  }
}
