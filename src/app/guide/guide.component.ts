import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit} from '@angular/core';
import { Runes } from '../../assets/runes';
import {RuneGlyphComponent} from './rune-glyph/rune-glyph.component';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {

  runes = Runes;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }
}
