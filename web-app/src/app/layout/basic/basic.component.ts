import { Component, Inject } from '@angular/core';
import { I18NService } from '@core';
import { ALAIN_I18N_TOKEN, SettingsService, User } from '@delon/theme';
import { LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';

import { CONSTANTS } from '../../shared/constants';

@Component({
  selector: 'layout-basic',
  template: `
    <layout-default [options]="options" [nav]="navTpl" [content]="contentTpl" [customError]="null">
      <layout-default-header-item direction="left">
        <a layout-default-header-item-trigger href="//github.com/apache/hertzbeat" target="_blank">
          <i nz-icon nzType="github"></i>
        </a>
      </layout-default-header-item>

      <layout-default-header-item direction="left" hidden="pc">
        <div layout-default-header-item-trigger (click)="searchToggleStatus = !searchToggleStatus">
          <i nz-icon nzType="search"></i>
        </div>
      </layout-default-header-item>
      <layout-default-header-item direction="middle">
        <header-search class="alain-default__search" [toggleChange]="searchToggleStatus"></header-search>
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <header-notify></header-notify>
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <a layout-default-header-item-trigger routerLink="/passport/lock">
          <i nz-icon nzType="lock"></i>
        </a>
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <div layout-default-header-item-trigger nz-dropdown [nzDropdownMenu]="settingsMenu" nzTrigger="click" nzPlacement="bottomRight">
          <i nz-icon nzType="setting"></i>
        </div>
        <nz-dropdown-menu #settingsMenu="nzDropdownMenu">
          <div nz-menu style="width: 200px;">
            <div nz-menu-item>
              <header-fullscreen></header-fullscreen>
            </div>
            <div nz-menu-item routerLink="/setting/labels">
              <i nz-icon nzType="tag" class="mr-sm"></i>
              <span style="margin-left: 4px">{{ 'menu.advanced.labels' | i18n }}</span>
            </div>
            <div nz-menu-item>
              <header-i18n></header-i18n>
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <header-user></header-user>
      </layout-default-header-item>
      <ng-template #navTpl>
        <layout-default-nav class="d-block py-lg" openStrictly="true"></layout-default-nav>
      </ng-template>
      <ng-template #contentTpl>
        <router-outlet></router-outlet>
      </ng-template>
    </layout-default>
    <global-footer style="border-top: 1px solid #e5e5e5; min-height: 120px; margin:0;">
      <div style="margin-top: 30px">
        Apache HertzBeat (incubating) {{ version }}<br />
        Copyright &copy; {{ currentYear }}
        <a href="https://hertzbeat.apache.org" target="_blank">Apache HertzBeat</a>
        <br />
        Licensed under the Apache License, Version 2.0
      </div>
    </global-footer>
    <setting-drawer *ngIf="showSettingDrawer"></setting-drawer>
  `
})
export class LayoutBasicComponent {
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/brand_white.svg`,
    logoCollapsed: `./assets/logo.svg`
  };
  avatar: string = `./assets/img/avatar.svg`;
  searchToggleStatus = false;
  showSettingDrawer = !environment.production;
  version = CONSTANTS.VERSION;
  currentYear = new Date().getFullYear();
  get user(): User {
    return this.settings.user;
  }

  get role(): string {
    let userTmp = this.settings.user;
    if (userTmp == undefined || userTmp.role == undefined) {
      return this.i18nSvc.fanyi('app.role.admin');
    } else {
      let roles: string[] = JSON.parse(userTmp.role);
      return roles.length > 0 ? roles[0] : '';
    }
  }

  constructor(private settings: SettingsService, @Inject(ALAIN_I18N_TOKEN) private i18nSvc: I18NService) {}
}
