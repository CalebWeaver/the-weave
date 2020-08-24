import {Runes} from '../assets/runes';

export class Spell {
  spell: string[];

  constructor(spell?: string) {
    if (spell) {
      this.read(spell);
    }
  }

  public static toString(spell: string[]) {
    return spell.toString().replace(/,/g, '');
  }

  public toString() {
    return this.spell.toString().replace(/,/g, '');
  }

  read(spellText: string): Spell {
    this.spell = [...spellText];

    let rawRune = '';
    let rawRuneStart = -1;
    for (let i = 0; i < this.spell.length; i++) {
      const rune = this.spell[i];
      if (rune.match(/[a-zA-Z]/)) {
        if (rawRuneStart === -1) {
          rawRuneStart = i;
        }
        rawRune += rune;
        const parsedRune = this.getRune(rawRune);
        if (parsedRune) {
          this.spell.splice(rawRuneStart, i + 1 - rawRuneStart, parsedRune);
          i = (i - rawRuneStart) + 1;
        }
      } else {
        rawRune = '';
        rawRuneStart = -1;
      }
    }

    return this;
  }

  private getRune(word: string) {
    word = word.trim();
    if (word.length > 2) {
      const rune = Runes[word];
      if (rune) {
        return rune.glyph;
      }
    }
  }

  public indexOf(rune: string) {
    return this.spell.indexOf(rune);
  }

  public slice(start?: number, end?: number): Spell {
    return new Spell(Spell.toString(this.spell.slice(start, end)));
  }

  public map(action: (rune: string) => any) {
    if (this.spell) {
      return this.spell.map(action);
    }
  }
}
