import { Injectable } from '@angular/core';
import {Runes, Quantities} from '../../assets/runes';
import {Spell} from '../classes/spell';
import SpellError from '../errors/SpellError';
import RuneOrderError from '../errors/RuneOrderError';
import RuneNotFoundError from '../errors/RuneNotFoundError';

@Injectable({
  providedIn: 'root'
})
export class CastingService {

  tecLimit: number;
  thermalHarness: number;
  harnessCoord: number;
  arcaneSiphonLimit: number;

  constructor() { }

  public cast(spell: Spell): string {

    const defaultOutcome = 'Nothing happens.';

    try {
      this.tecLimit = this.getThermalEnergyConfluxLimit(spell);
      this.thermalHarness = this.getThermalHarness(spell);
      this.arcaneSiphonLimit = this.getArcaneSiphon(spell);
      console.log('spellStats', this);
      if (this.thermalHarness < .1) {
        // Minute
        return defaultOutcome;
      } else if (this.thermalHarness <= .3) {
        // Single target
        if (this.tecLimit > 50) {
          return 'A burst of fire launches at your target.';
        } else if (this.tecLimit > 20) {
          return 'A small flame reaches the target.';
        } else if (this.tecLimit > 0) {
          return 'A spark moves towards your target, nothing more.';
        }
      } else if (this.thermalHarness <= .5) {
        // Small Burst / Cone
        if (this.tecLimit > 50) {
          return 'A cone of fire bursts forward.';
        } else if (this.tecLimit > 20) {
          return 'A textbook fireball with a direct hit.';
        } else if (this.tecLimit > 0) {
          return 'A burst of fire leaves your hands, but has no distance.';
        }
      } else if (this.thermalHarness <= .7) {
        // Large AOE
        if (this.tecLimit > 50) {
          return 'A ring of fire encircles you for 10 feet.';
        } else if (this.tecLimit > 20) {
          return 'A ring of fire encircles you for 5 feet.';
        } else if (this.tecLimit > 0) {
          return 'The air grows warmer around you.';
        }
      } else {
        // Scattered
        if (this.tecLimit > 90) {
          return 'A burst of fire erupts from you in all directions. Everything around is turned to ash';
        } else if (this.tecLimit > 50) {
          return 'Fire quickly flares up and dissipates.';
        } else if (this.tecLimit > 0) {
          return 'The air grows warmer around you.';
        }
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
      this.harnessCoord = spell.getCoord(Runes.snarb.glyph, Runes.brans.glyph);
      const thermalHarnessSegment = spell.getBoundSegment(Runes.snarb.glyph, Runes.brans.glyph);
      const harnessQuantity = this.getQuantity(thermalHarnessSegment.slice(Runes.naliti.glyph));
      const thermalHarness = harnessQuantity / this.tecLimit;
      return thermalHarness;
    } catch (e) {
      this.handleSpellError(e, {});
    }
  }

  public getArcaneSiphon(spell: Spell): number {
    try {
      const siphonCoord = spell.getCoord(Runes.keso.glyph, Runes.osek.glyph);
      const siphonSegment = spell.getBoundSegment(Runes.keso.glyph, Runes.osek.glyph);
      const direction = this.getDirection(siphonSegment);
      if ((siphonCoord < this.harnessCoord && direction === 1)
        || (siphonCoord > this.harnessCoord && direction === -1)) {
        const quantitySegment = spell.getBoundSegment(Runes.horum.glyph, Runes.muroh.glyph);
        return this.getQuantity(quantitySegment);
      } else {
        throw new SpellError('Incorrect direction');
      }
    } catch (e) {
      const siphonError = 'Magic floods out of the spell, uncontained.';
      this.handleSpellError(e, {
        RuneOrderException: siphonError,
        SpellError: siphonError
      });
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

  // -1 left 1 right
  getDirection(spell: Spell): number {
    const leftRuneIndex = spell.indexOf(Runes.pentro.glyph);
    const afterRuneIndex = spell.indexOf(Runes.asero.glyph);
    if (leftRuneIndex > -1
      && afterRuneIndex === -1) {
      return -1;
    } else if (leftRuneIndex === -1
      && afterRuneIndex > -1) {
      return 1;
    }  else if (leftRuneIndex > -1
      && afterRuneIndex > -1) {
      return leftRuneIndex < afterRuneIndex ? -1 : 1;
    } else {
      throw new RuneNotFoundError('No direction indicated');
    }
  }
}
