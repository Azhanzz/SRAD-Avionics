#ifndef RADIO_H
#define RADIO_H

#if defined(ARDUINO)
#include <Arduino.h>
#elif defined(_WIN32) || defined(_WIN64) // Windows
#include <cstdint>
#include <string>
#include <cstring>
#elif defined(__unix__)  // Linux
// TODO
#elif defined(__APPLE__) // OSX
// TODO
#endif

enum EncodingType
{
    ENCT_TELEMETRY,
    ENCT_VIDEO,
    ENCT_GROUNDSTATION
};

class Radio
{
public:
    virtual ~Radio(){}; // Virtual descructor. Very important
    virtual void begin() = 0;
    virtual bool tx(char *message) = 0;
    virtual const char *rx() = 0;
    virtual bool encode(char *message, EncodingType type) = 0;
    virtual bool decode(char *message, EncodingType type) = 0;
    virtual bool send(const char *message, EncodingType type) = 0;
    virtual const char *receive(EncodingType type) = 0;
    virtual int RSSI() = 0;
};

#endif // RADIO_H