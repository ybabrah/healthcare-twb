import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonOptions, ButtonKind } from '@usitsdasdesign/dds-ng/button';
import { SelectOptions } from '@usitsdasdesign/dds-ng/select';
import { LabelPosition, Size, Themes } from '@usitsdasdesign/dds-ng/shared';
import * as _ from 'lodash';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public activeNavigation = 0;

  public navigation = [
    {name: 'Home', link: '', theme: Themes.green, isActive: true},
    {name: 'Test Design', link: '/design', theme: Themes.dark, isActive: false},
    {name: 'Settings', link: '/settings', theme: Themes.dark, isActive: false}
  ]

  public headerOptions = {
    'name': 'Healthcare Test Workbench',
    'theme': 'green',
    'width': 'full'
  }

  public selectOptions: SelectOptions = {
    label: '',
    labelPosition: LabelPosition.internal,
    description: '',
    placeholder: 'Select Project',
    size: Size.md,
    isDisabled: false,
    isError: false,
    errorMessage: ''
  };

  public profileOptions = {
    'username': 'Yuvraj Babrah',
    'nameLetter': 'YB',
    'userInfo': 'Consultant'
  }

  public selectedItem: string = "Project XYZ";

  public selectItems = [
    {'heading': 'Project XYZ', 'value': 'Project XYZ'},
    {'heading': 'Project XYZ', 'value': 'Project XYZ'}
  ]

  public buttonNavOptions: ButtonOptions = {
    theme: Themes.dark,
    kind: ButtonKind.primaryLoud,
    size: Size.lg,
  };

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
    // get current route
    let currPath = this.location.path();

    _.forEach(this.navigation, (nav, idx) => {
      if(nav.link.localeCompare(currPath) == 0) {
        nav.isActive = true;
        nav.theme = Themes.green;
      } else {
        nav.isAvtive = false;
        nav.theme = Themes.dark
      }
    });
  }

  public navigate(event, index) {
    _.forEach(this.navigation, (nav, idx) => {
      if(idx != index) {
        nav.isAvtive = false;
        nav.theme = Themes.dark
      } else {
        nav.isActive = true;
        nav.theme = Themes.green
      }
    });
    
    // finally route
    this.router.navigate([this.navigation[index].link]);
  }
}
