import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-language-settings',
  templateUrl: 'language-settings.html',
})
export class LanguageSettingsPage {

  constructor(private translateService: TranslateService) {
  }

  public onSelect(data): void {
    this.translateService.use(data);
  }


}
