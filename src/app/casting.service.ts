import { Injectable } from '@angular/core';
import {Runes, Quantities} from '../assets/Runes';
import {Spell} from './spell';
import SpellError from './errors/SpellError';
import RuneOrderError from './errors/RuneOrderError';

@Injectable({
  providedIn: 'root'
})
export class CastingService {

  tecLimit: number;
  thermalHarness: number;

  constructor() { }

  public cast(spell: Spell): string {

    const defaultOutcome = 'Nothing happens.';

    try {
      this.tecLimit = this.getThermalEnergyConfluxLimit(spell);
      this.thermalHarness = this.getThermalHarness(spell);
      console.log('spellStats', this);
      // TODO outcomes to use harness
      if (this.tecLimit > 50) {
        return 'A roar of fire engulfs everything around you.';
      } else if (this.tecLimit > 20) {
        return 'Flame spouts around you.';
      } else if (this.tecLimit > 0) {
        return 'The air gets warmer.';
      }
    } catch (ex) {
      if (ex.name === 'SpellError') {
        return ex.message || defaultOutcome;
      }
    }
    return defaultOutcome;
  }

  public getThermalEnergyConfluxLimit(spell: Spell): number {
    let tecLimit = 0;
    try {
      tecLimit = this.getQuantity(spell.getBoundSegment(Runes.etli.glyph, Runes.ilte.glyph));
    } catch (e) {
      this.handleSpellError(e, {
        RuneOrderError: 'The air bites and frost clings to each part of your body. Take 1d4 cold damage.'
      });
    }

    return tecLimit;
  }

  public getThermalHarness(spell: Spell): number {
    try {
      const thermalHarnessSegment = spell.getBoundSegment(Runes.snarb.glyph, Runes.brans.glyph);
      const harnessQuantity = this.getQuantity(thermalHarnessSegment.slice(Runes.naliti.glyph));
      const thermalHarness = harnessQuantity / this.tecLimit;
      return thermalHarness;
    } catch (e) {
      this.handleSpellError(e, {});
    }
  }

  private handleSpellError(error, messages): void {
    console.error(error);
    throw new SpellError(messages[error.name]);
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
