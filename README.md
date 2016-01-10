Gateway
=======

Hub for the Lab11 gateway projects.

BleGateway
----------

The [BleGateway](https://github.com/lab11/gateway/tree/master/software/ble-gateway)
provides a general way to collect data from BLE devices.
It's organized as a core gateway service that publishes formatted data packets
from service adapters that make the packets available over various protocols.

```
                                       +--------+
                                       |        |
                                       |  Web   |
                             +-------> | Server |
                             |         |        |
                             |         +--------+
                             |
                             |          +------+
                             |          |      |  MQTT topic "ble-gateway-advertisements"
                +---------+  +--------> | MQTT | +--------------------------------------->
    BLE         |         |  |          |      |
 Advertisement  |   Ble   +--+          +------+
+-+    +------> | Gateway |  |
|D+----+        |         |  |       +-----------+
+-+             +---------+  |       |           |  WebSocket Port 3001
                             +-----> | WebSocket | +------------------->
                             |       |  Server   |
                             |       |           |
                             |       +-----------+
                             |
                             |       +-----------+
                             |       |           |  UDP port 3002
                             +-----> |    UDP    | +------------->
                                     | Broadcast |
                                     |           |
                                     +-----------+
```



Related Projects
----------------

- **[IoT Gateway](https://github.com/lab11/iot-gateway)**: Leverage
smartphones to forward BLE advertisements.

- **[CloudComm](https://github.com/lab11/opo/tree/master/node)**: Eventual
data delivery to the cloud over BLE.

- **[PowerBlade](https://github.com/lab11/powerblade/tree/master/data_collection/advertisements)**:
Collect BLE advertisements from PowerBlade devices.

- **[GAP](https://github.com/lab11/gap)**: Add 802.15.4 hardware support
to the BeagleBone Black.


