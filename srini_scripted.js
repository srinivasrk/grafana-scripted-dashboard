/* global _ */

'use strict' ;

var window, document, ARGS, $, jQuery, moment, kbn;

var dashboard

var ARGS

dashboard = {
  rows: []
};

dashboard.title = 'Srini scripted dash'

dashboard.time = {
  from : "now-6h",
  to : "now"
};

var rows = 1
// it is a array of fields that needs to be shown on the graph -> eg : if you want to see cpu_usage and cpu_idle on same plot
var filedKeys = []

var fieldArray = ['usage_idle'] // array with one element only by default
if(!_.isUndefined(ARGS.field)) {
  fieldArray = ARGS.field.split(';') //creates a array of field values to be displayed
}

var measurement = 'cpu'
if(!_.isUndefined(ARGS.measurement)) {
  measurement = ARGS.measurement
}

let customTargets = []
for(var i = 0; i < fieldArray.length; i++) {
  let temp = {}
  //create one target object for each field
  temp.measurement = measurement;
  temp.query = "SELECT mean("+ fieldArray[i] + ") FROM " + measurement + " WHERE $timeFilter GROUP BY time(5m) fill(null)"
  temp.groupBy = [{"params": ["5m"],"type": "time"},{"params": ["null"],"type": "fill"}]
  temp.select = [[{"params" : [fieldArray[i]], "type" : "field"}, {"params": [],"type": "mean"}]]
  temp.resultFormat = "time_series"
  temp.rawQuery = true;
  temp.hide = false;
  temp.orderByTime = "ASC";
  temp.policy = "default";

  customTargets.push(temp)
}


for (var i = 0; i < rows; i++) {
  dashboard.rows.push({
    title: 'Chart',
    height: '300px',
    panels: [
      {
        title: 'Events',
        type: 'graph',
        span: 12,
        fill: 1,
        linewidth: 2,
        targets: customTargets,
        tooltip: {
          shared: true
        }
      }
    ]
  });
}


console.log(dashboard);


return dashboard
