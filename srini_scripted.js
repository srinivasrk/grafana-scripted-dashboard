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

dashboard.panels = [] // for msdgc, one panel


var fieldArray = ['usage_idle'] // array with one element only by default
if(!_.isUndefined(ARGS.field)) {
  fieldArray = ARGS.field.split(';') //creates a array of field values to be displayed
}

var measurement = 'cpu'
if(!_.isUndefined(ARGS.measurement)) {
  measurement = ARGS.measurement
}

//create panels
let customPanels = [] // for now we will only have one panel

//create targets
let customTargets = []
for(var i = 0; i < fieldArray.length; i++) {
  let temp = {}
  //create one target object for each field
  temp.measurement = measurement;
  temp.query = "SELECT mean( "+ fieldArray[i] + ") FROM " + measurement + "WHERE $timeFilter GROUP BY time(5m) fill(null)"
  temp.groupBy = [{"params": ["5m"],"type": "time"},{"params": ["null"],"type": "fill"}]
  temp.select = [[{"params" : [fieldArray[i]], "type" : "field"}, {"params": [],"type": "mean"}]]
  temp.resultFormat = "time_series"
  temp.rawQuery = true;
  temp.hide = false;
  temp.orderByTime = "ASC";
  temp.policy = "default";

  customTargets.push(temp)
}

  customPanels.targets = customTargets
customPanels.gridPos = {
  "h": 9,
  "w": 12,
  "x": 0,
  "y": 0
}

customPanels.fill = 1
customPanels.lines = true
customPanels.linewidth = 1
customPanels.renderer = "flot"
customPanels.tooltip = {
  "shared" : true,
  "sort" : 0,
  "value_type" : "individual"
}

customPanels.type = "graph"


dashboard.rows.push({
  panels: customPanels
})

console.log(dashboard);


return dashboard
