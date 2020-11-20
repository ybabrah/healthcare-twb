import { Component, OnInit } from '@angular/core';
import { ButtonOptions, ButtonKind } from '@usitsdasdesign/dds-ng/button';
import { SearchOptions } from '@usitsdasdesign/dds-ng/search';
import { Themes, Size, WidthState } from '@usitsdasdesign/dds-ng/shared';

import * as moment from 'moment';
import * as _ from 'lodash';

import {default as tests} from './test-cases.json';
import {default as test_steps} from './test-steps.json';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-testdesign',
  templateUrl: './testdesign.component.html',
  styleUrls: ['./testdesign.component.css']
})
export class TestdesignComponent implements OnInit {
  searchValue = '';
  events = [];

  searchOptions: SearchOptions = {
    placeholder: 'Search',
    isDisabled: false
  };

  label = 'Add New Test';

  options: ButtonOptions = {
    theme: Themes.green,
    kind: ButtonKind.primary,
    size: Size.lg,
    width: WidthState.fixed,
    isLoading: false,
    icon: 'dds-icon_plus',
    isDisabled: false,
  }

  changeValue(value: string) {
    console.log(value);
  }

  calendarOptions: CalendarOptions = {
    height: "auto",
    firstDay: moment().day(),
    initialView: 'resourceTimelineWeek',
    //initialView: 'resourceTimelineFourDays',
    views: {
      resourceTimelineFourDays: {
        type: 'resourceTimelineWeek',
        dateIncrement: { days: 1 },
        duration: { 
          days: 7
        }
      },
    },
    resources: tests,
    events: [],
    slotMinTime: '23:00:00',
    slotLabelFormat: function(data) {
      let dt = moment(data.start);
      let diff = dt.diff(moment(), 'days');
      
      return "Test Day " + (diff + 1);
    },
    resourceAreaColumns: [
      {
        field: 'id',
        headerContent: 'Test Name',
        width: 120
      },
      {
        field: 'test_desc',
        headerContent: 'Description'
      }
    ],
    dateClick: this.handleDateClick.bind(this) // bind is important!
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  constructor() { }

  ngOnInit(): void {
    this.prepareEvents(); 
  }

  private prepareEvents() {
    let start = moment();

    _.forEach(test_steps, (test) => {
      let test_id = test.id;
      let steps = test.steps;

      _.forEach(steps, (stp, idx) => {
        let obj = {
          resourceId: test_id,
          title: stp.detail,
          start: start.clone().add(idx, 'days').format("YYYY-MM-DD"),
          end: start.clone().add(idx, 'days').format("YYYY-MM-DD")
        }

        this.events.push(obj);
      })
    });

    console.log(this.events);

    this.calendarOptions.events = this.events;
  }

}
