# include <RTC.h>
#include "DS3231.h"


// constructor for the DS3231 class
DS3231::DS3231() {
   rtc = RTC_DS3231();
   millisAtStart = 0; // initialized at power on
   powerOnTime = nullptr; // initialized at power on
   launchTime = nullptr; // initialized at launch
}

// returns time since power on as a vector, first entry with seconds precision and second entry with ms
imu::Vector<2> DS3231::getTimeOn() {
    int secSincePowerOn = getCurrentTime().unixtime() - getPowerOnTime().unixtime(); // seconds since power on
    int extraMillis = millis() - secSincePowerOn * 1000;
    return imu::Vector<2>(secSincePowerOn, extraMillis);
}

imu::Vector<2> DS3231::getTimeSinceLaunch() {
    int secSinceLaunch = getCurrentTime().unixtime() - getLaunchTime().unixtime();
    int extraMillis = millis() - secSinceLaunch * 1000;
    return imu::Vector<2>(secSinceLaunch, extraMillis);
}

void DS3231::initialize() {
    powerOnTime = rtc.now();
    millisAtStart = millis();
}

void DS3231::onLaunch() {
    launchTime = rtc.now();
}

DateTime DS3231::getPowerOnTime() {
    return powerOnTime;
}

DateTime DS3231::getLaunchTime() {
    return launchTime;
}

DateTime DS3231::getCurrentTime() {
    return rtc.now();
}
