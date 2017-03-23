cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-device-sensor-fusion.FusionResult",
        "file": "plugins/cordova-plugin-device-sensor-fusion/www/FusionResult.js",
        "pluginId": "cordova-plugin-device-sensor-fusion",
        "clobbers": [
            "FusionResult"
        ]
    },
    {
        "id": "cordova-plugin-device-sensor-fusion.FusionError",
        "file": "plugins/cordova-plugin-device-sensor-fusion/www/FusionError.js",
        "pluginId": "cordova-plugin-device-sensor-fusion",
        "clobbers": [
            "FusionError"
        ]
    },
    {
        "id": "cordova-plugin-device-sensor-fusion.fusion",
        "file": "plugins/cordova-plugin-device-sensor-fusion/www/fusion.js",
        "pluginId": "cordova-plugin-device-sensor-fusion",
        "clobbers": [
            "navigator.fusion"
        ]
    },
    {
        "id": "cordova-plugin-vibration.notification",
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-device-sensor-fusion": "0.0.3",
    "cordova-plugin-vibration": "2.1.4"
};
// BOTTOM OF METADATA
});