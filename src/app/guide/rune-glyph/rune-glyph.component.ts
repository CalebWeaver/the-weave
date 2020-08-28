import {Component, Input, OnInit} from '@angular/core';
import {Runes} from '../../../assets/Runes.js';

@Component({
  selector: 'app-rune-glyph',
  templateUrl: './rune-glyph.component.html',
  styleUrls: ['./rune-glyph.component.scss']
})
export class RuneGlyphComponent implements OnInit {

  rune: string;
  name: string;

  @Input()
  set runeName(name: string) {
    this.rune = Runes[name].glyph;
    this.name = name;
  }

  constructor() { }

  ngOnInit() {
  }

}
