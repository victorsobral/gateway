#!/usr/bin/env node

// var exec = require('child_process').exec;
var fs   = require('fs');

// var async     = require('async');
var gatewayId  = require('lab11-gateway-id');
var mqtt       = require('mqtt');
var serialport = require('serialport');
var watchout   = require('watchout');
// var ini       = require('ini');

// var GatewayTopics = require('gateway-topics');

var enocean = require( "node-enocean" )();  // require node-enocen

var MQTT_TOPIC_NAME = 'gateway-data';

var _mqtt_client = undefined;
var _gateway_id = '';

serialport.list(function (err, ports) {
  if (err) {
    console.log('Error reading serial ports.');
  } else {
    ports.forEach(function (port) {
      if (port.pnpId && port.pnpId.indexOf('EnOcean') != -1) {
        gatewayId.id(function (addr) {
          _gateway_id = addr;

          _mqtt_client = mqtt.connect('mqtt://c098e5c00007.device.lab11.eecs.umich.edu');
          _mqtt_client.on('connect', function () {
            enocean.listen("/dev/ttyUSB1");
          });
        });
      }
    })
  }
});



enocean.on("ready", function () {
  console.log('Listening for EnOcean packets.');
  enocean.startLearning();
});

enocean.on("learned",function(data){
	// console.log(data)
});

enocean.on("known-data", function (data) {
	var out = {
		device: data.sensor.eepType,
		_meta: {
			received_time: new Date().toISOString(),
			device_id: data.sensor.id,
			receiver: 'enocean-generic-gateway',
			gateway_id: _gateway_id
		}
	};

  for (var shortname in data.data) {
    var item = data.data[shortname];
    // Skip any information about the learn bit.
    if (shortname.indexOf('LRN') != -1 || item.name.indexOf('Learn') != -1) {
      continue;
    }

    // Otherwise add this to the packet.
    var key = item.name;
    if (item.unit) {
      key += '_' + item.unit;
    }

    out[key] = item.value;
  }

  _mqtt_client.publish(MQTT_TOPIC_NAME, JSON.stringify(out));
});
