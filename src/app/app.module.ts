import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GifsModule } from './gifs/gifs.module';

@NgModule({
  declarations: [AppComponent],
  // importamos el "HttpClientModule" aquí para hacerlo global y usarlo enel módulo acual o sus hijos,
  // también podría ser importado en algún sub módulo específico.
  // HttpClientModule : Lo ponemos segundo ya que primero van los módulos propios de Angular.
  imports: [BrowserModule, HttpClientModule, SharedModule, GifsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
