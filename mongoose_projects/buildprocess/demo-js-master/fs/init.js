/*
 * Copyright (c) 2014-2017 Cesanta Software Limited
 * All rights reserved
 *
 * This example demonstrates how to use mJS DHT library API
 * to get data from DHTxx temperature and humidity sensors.
 */

// Load Mongoose OS API
load('api_timer.js');
load('api_dht.js');
load('api_mqtt.js');
load('api_net.js');
load('api_config.js');

// GPIO pin which has a DHT sensor data wire connected
let pin = 27;
let topic = '/devices/' + Cfg.get('device.id') + '/events';

// Initialize DHT library
let dht = DHT.create(pin, DHT.DHT22);

let getInfo = function(temp,humid,deviceName) {
   return JSON.stringify({
     deviceId:deviceName,
     deviceType:deviceName,
     temp: temp,
     humidity: humid
   });
 };

// This function reads data from the DHT sensor every 2 second
Timer.set(30000 /* milliseconds */, Timer.REPEAT, function() {
  let t = dht.getTemp();
  let h = dht.getHumidity();

  if (isNaN(h) || isNaN(t)) {
    print('Failed to read data from sensor');
    return;
  }

  print('Temperature:', t, '*C');
  print('Humidity:', h, '%');
let deviceName  = Cfg.get('device.id');
let message = getInfo(t,h,deviceName);
   let ok = MQTT.pub(topic, message, 1);
   print('Published:', ok, topic, '->', message);
}, null);
