#include "EncodeAPRSForSerial.h"
#include "Adafruit_BNO055.h"
#include <Arduino.h>
#include "../Radio/RFM69HCW.h"
#include "../Radio/APRS/APRSCmdMsg.h"
#include <BlinkBuzz.h>

APRSHeader header = {"KC3UTM", "APRS", "WIDE1-1", '/', 'o'};
APRSTelemMsg msg(header);
APRSCmdMsg cmd(header);
RadioSettings settings = {433.78, 0x02, 0x01, &hardware_spi, 15, 16, 14};
RFM69HCW radio(&settings);

int arr[] = {LED_BUILTIN, 33};
BlinkBuzz bb(arr, 1, true);
void setup()
{

    delay(2000); // Delay to allow the serial monitor to connect

    if (!radio.init())
        Serial.println("Radio failed to initialize");
    else
        Serial.println("Radio initialized");

    // Test Case for Demo Purposes
    cmd.data.MinutesUntilPowerOn = 0;
    cmd.data.MinutesUntilDataRecording = -1;
    cmd.data.MinutesUntilVideoStart = -2;
    cmd.data.Launch = false;
}

int counter = 1;
void loop()
{
    if (radio.update())
    {
        if (radio.dequeueReceive(&msg))
        {
            char buffer[255];
            aprsToSerial::encodeAPRSForSerial(msg, buffer, 255, radio.RSSI());
            Serial.println(buffer);
        }
        if (counter % 50 == 0) // Send a command every 50x a message is received (or every 25 seconds)
            radio.enqueueSend(&cmd);

        if (counter == 190) // Send a command after 190x a message is received (or after 95 seconds) to launch the rocket
        {
            cmd.data.Launch = !cmd.data.Launch;
            radio.enqueueSend(&cmd);
        }
    }
    if (Serial.available())
    {
        char buffer[255];
        Serial.readBytesUntil('\n', buffer, 255);
        char boolStr[6]; // "true" or "false" (max length 5 + 1 for null terminator)

        // Parse the input string
        sscanf(buffer, "%d,%d,%d,%5s", &cmd.data.MinutesUntilPowerOn, &cmd.data.MinutesUntilVideoStart, &cmd.data.MinutesUntilDataRecording, boolStr);

        // Convert the string "true"/"false" to a boolean value
        if (strcmp(boolStr, "true") == 0)
        {
            cmd.data.Launch = true;
        }
        else if (strcmp(boolStr, "false") == 0)
        {
            cmd.data.Launch = false;
        }

        // Send the command
        radio.enqueueSend(&cmd);
    }
}