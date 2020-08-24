export class Rune {
  rune: string[];

  public toRunes(rawRune: string) {
    this.rune = [...rawRune];
  }

  public toString() {
    return this.rune.toString().replace(',', '');
  }
}
