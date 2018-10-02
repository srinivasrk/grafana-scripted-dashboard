#This project attempts to automate the dashboard creation in Grafana

Using the scripted dashboard concept of grafana : http://docs.grafana.org/reference/scripting/ we can build upon that concept to make more complex dashboards

##Using this code
This javascript file (srini_scripted.js) has to be copied to /usr/share/grafana/public/dashboards/
Once the file is in place run the URL below :

` http://<grafanaport>/dashboard/script/srini_scripted.js?orgId=1&field=usage_user;usage_idle;usage_system&from=1538459513944&to=1538501776374 `

And voila we get the output

![screenshot] (./output.PNG)
