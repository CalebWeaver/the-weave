import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpellInputComponent } from './spell-input/spell-input.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GuideComponent } from './guide/guide.component';
import { RuneGlyphComponent } from './guide/rune-glyph/rune-glyph.component';

@NgModule({
  declarations: [
    AppComponent,
    SpellInputComponent,
    GuideComponent,
    RuneGlyphComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
