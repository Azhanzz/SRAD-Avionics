#ifndef MAX_M10S_H
#define MAX_M10S_H

#include <Wire.h>
#include "SparkFun_u-blox_GNSS_v3.h"
#include <Arduino.h>
#include "GPS.h"

class MAX_M10S : public GPS {
private:
    SFE_UBLOX_GNSS m10s;
    imu::Vector<2> pos;             // latitude and longitude
    double altitude;                // alti in mm 
    imu::Vector<3> velocity;        // m per s
    imu::Vector<3> displacement;    // m from starting location
    imu::Vector<3> origin;           // lat, long, alti of the original location in m
    double gps_time;                // time since start of program in seconds
    int fix_qual;                   // num of connections to satellites
    imu::Vector<3> real_time;            // returns the current hour, min, and sec 

public:
    MAX_M10S();
    void calibrate(); 
    void read_gps();
    double get_alt();
    imu::Vector<3> get_velocity();
    imu::Vector<2> get_pos();
    imu::Vector<3> get_displace();
    double get_gps_time();
    imu::Vector<3> get_time();
    int get_fix_qual();
    String getcsvHeader();
    String getdataString();
    String getStaticDataString();
};

#endif //MAX_M10S_H


// Danny S.