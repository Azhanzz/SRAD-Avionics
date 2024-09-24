#ifndef SI4463_H
#define SI4463_H

#include "Radio.h"
#include "SPI.h"

#define PART_NO 0x4463
#define MAX_SET_PROPS 12

class Si4463 : public Radio
{
public:
    Message m;

    Si4463() {};
    bool begin() override;
    // bool begin();
    bool tx(const uint8_t *message, int len = -1) override;
    const char *rx() override;
    bool send(Data &data) override;
    const char *receive(Data &data) override;
    int RSSI() override;

private:
    SPIClass *spi;
    // pins
    uint8_t _cs;
    // slightly higher level
    void waitCTS();
    void setProperty();
    void getProperty();
    void sendCommand();
    void powerOn();
    // low level abstractions
    void spi_write(uint8_t reg, uint8_t argc, uint8_t *argv);
    void spi_read(uint8_t reg, uint8_t argc, uint8_t *argv);
    uint8_t spi_read(uint8_t reg);

    static void from_bytes(uint16_t &val, uint8_t pos, uint8_t *arr, bool MSB = true);
    static void from_bytes(uint32_t &val, uint8_t pos, uint8_t *arr, bool MSB = true);
    static void from_bytes(uint64_t &val, uint8_t pos, uint8_t *arr, bool MSB = true);
    static void to_bytes(uint16_t val, uint8_t pos, uint8_t *arr, bool MSB = true);
    static void to_bytes(uint32_t val, uint8_t pos, uint8_t *arr, bool MSB = true);
    static void to_bytes(uint64_t val, uint8_t pos, uint8_t *arr, bool MSB = true);
};

// commands
enum Si4463Cmd : uint8_t
{
    // boot commands
    C_POWER_UP = 0x02,
    // common commands
    C_NOP = 0x00,
    C_PART_INFO = 0x01,
    C_FUNC_INFO = 0x10,
    C_SET_PROPERTY = 0x11,
    C_GET_PROPERTY = 0x12,
    C_GPIO_PIN_CFG = 0x13,
    C_FIFO_INFO = 0x15,
    C_GET_INT_STATUS = 0x20,
    C_REQUEST_DEVICE_STATE = 0x33,
    C_CHANGE_STATE = 0x34,
    C_READ_CMD_BUFF = 0x44,
    C_FRR_A_READ = 0x50,
    C_FRR_B_READ = 0x51,
    C_FRR_C_READ = 0x53,
    C_FRR_D_READ = 0x57,
    // image rejection calibration commands
    C_IRCAL = 0x17,
    C_IRCAL_MANUAL = 0x1a,
    // tx commands
    C_START_TX = 0x31,
    C_TX_HOP = 0x37,
    C_WRITE_TX_FIFO = 0x66,
    // rx commands
    C_PACKET_INFO = 0x16,
    C_GET_MODEM_STATUS = 0x22,
    C_START_RX = 0x32,
    C_RX_HOP = 0x36,
    C_READ_RX_FIFO = 0x77,
    // advanced commands
    C_GET_ADC_READING = 0x14,
    C_GET_PH_STATUS = 0x21,
    C_GET_CHIP_STATUS = 0x23,
};

// registers
enum Si4463Group : uint8_t
{
    G_GLOBAL = 0x00,
    G_INT_CTL = 0x01,
    G_FRR_CTL = 0x02,
    G_PREAMBLE = 0x10,
    G_SYNC = 0x11,
    G_PKT = 0x12,
    G_MODEM = 0x20,
    G_MODEM_CHFLT = 0x21,
    G_PA = 0x22,
    G_SYNTH = 0x23,
    G_MATCH = 0x30,
    G_FREQ_CONTROL = 0x40,
    G_RX_HOP = 0x50,
    G_PTI = 0xf0,
};

enum Si4463Property : uint8_t
{
    // organized by group                     // default
    P_GLOBAL_XO_TUNE = 0x00,                  // 0x40
    P_GLOBAL_CLK_CFG = 0x01,                  // 0x00
    P_GLOBAL_LOW_BAT_THRESH = 0x02,           // 0x18
    P_GLOBAL_CONFIG = 0x03,                   // 0x20
    P_GLOBAL_WUT_CONFIG = 0x04,               // 0x00
    P_GLOBAL_WUT_M1 = 0x05,                   // 0x00
    P_GLOBAL_WUT_M2 = 0x06,                   // 0x01
    P_GLOBAL_WUT_R = 0x07,                    // 0x60
    P_GLOBAL_WUT_LDC = 0x08,                  // 0x00
    P_GLOBAL_WUT_CAL = 0x09,                  // 0x00
                                              // default
    P_INT_CTL_ENABLE = 0x00,                  // 0x04
    P_INT_CTL_PH_ENABLE = 0x01,               // 0x00
    P_INT_CTL_MODEM_ENABLE = 0x02,            // 0x00
    P_INT_CTL_CHIP_ENABLE = 0x03,             // 0x04
                                              // default
    P_FRR_CTL_A_MODE = 0x00,                  // 0x01
    P_FRR_CTL_B_MODE = 0x01,                  // 0x02
    P_FRR_CTL_C_MODE = 0x02,                  // 0x09
    P_FRR_CTL_D_MODE = 0x03,                  // 0x00
                                              // default
    P_PREAMBLE_TX_LENGTH = 0x00,              // 0x08
    P_PREAMBLE_CONFIG_STD_1 = 0x01,           // 0x14
    P_PREAMBLE_CONFIG_NSTD = 0x02,            // 0x00
    P_PREAMBLE_CONFIG_STD_2 = 0x03,           // 0x0f
    P_PREAMBLE_CONFIG = 0x04,                 // 0x21
    P_PREAMBLE_PATTERN1 = 0x05,               // 0x00
    P_PREAMBLE_PATTERN2 = 0x06,               // 0x00
    P_PREAMBLE_PATTERN3 = 0x07,               // 0x00
    P_PREAMBLE_PATTERN4 = 0x08,               // 0x00
    P_PREAMBLE_POSTAMBLE_CONFIG = 0x09,       // 0x00
    P_PREAMBLE_POSTAMBLE_CONFIG1 = 0x0a,      // 0x00
    P_PREAMBLE_POSTAMBLE_CONFIG2 = 0x0b,      // 0x00
    P_PREAMBLE_POSTAMBLE_CONFIG3 = 0x0c,      // 0x00
    P_PREAMBLE_POSTAMBLE_CONFIG4 = 0x0d,      // 0x00
                                              // default
    P_SYNC_CONFIG = 0x00,                     // 0x01
    P_SYNC_BITS1 = 0x01,                      // 0x2d
    P_SYNC_BITS2 = 0x02,                      // 0xd4
    P_SYNC_BITS3 = 0x03,                      // 0x2d
    P_SYNC_BITS4 = 0x04,                      // 0xd4
    P_SYNC_CONFIG2 = 0x05,                    // 0x00
                                              // default
    P_PKT_CRC_CONFIG = 0x00,                  // 0x00
    P_PKT_WHT_POLY1 = 0x01,                   // 0x01
    P_PKT_WHT_POLY2 = 0x02,                   // 0x08
    P_PKT_WHT_SEED1 = 0x03,                   // 0xff
    P_PKT_WHT_SEED2 = 0x04,                   // 0xff
    P_PKT_WHT_BIT_NUM = 0x05,                 // 0x00
    P_PKT_CONFIG1 = 0x06,                     // 0x00
    P_PKT_CONFIG2 = 0x07,                     // 0x00
    P_PKT_LEN = 0x08,                         // 0x00
    P_PKT_LEN_FIELD_SOURCE = 0x09,            // 0x00
    P_PKT_LEN_ADJUST = 0x0a,                  // 0x00
    P_PKT_TX_THRESHOLD = 0x0b,                // 0x30
    P_PKT_RX_THRESHOLD = 0x0c,                // 0x30
    P_PKT_FIELD_1_LENGTH1 = 0x0d,             // 0x00
    P_PKT_FIELD_1_LENGTH2 = 0x0e,             // 0x00
    P_PKT_FIELD_1_CONFIG = 0x0f,              // 0x00
    P_PKT_FIELD_1_CRC_CONFIG = 0x10,          // 0x00
    P_PKT_FIELD_2_LENGTH1 = 0x11,             // 0x00
    P_PKT_FIELD_2_LENGTH2 = 0x12,             // 0x00
    P_PKT_FIELD_2_CONFIG = 0x13,              // 0x00
    P_PKT_FIELD_2_CRC_CONFIG = 0x14,          // 0x00
    P_PKT_FIELD_3_LENGTH1 = 0x15,             // 0x00
    P_PKT_FIELD_3_LENGTH2 = 0x16,             // 0x00
    P_PKT_FIELD_3_CONFIG = 0x17,              // 0x00
    P_PKT_FIELD_3_CRC_CONFIG = 0x18,          // 0x00
    P_PKT_FIELD_4_LENGTH1 = 0x19,             // 0x00
    P_PKT_FIELD_4_LENGTH2 = 0x1a,             // 0x00
    P_PKT_FIELD_4_CONFIG = 0x1b,              // 0x00
    P_PKT_FIELD_4_CRC_CONFIG = 0x1c,          // 0x00
    P_PKT_FIELD_5_LENGTH1 = 0x1d,             // 0x00
    P_PKT_FIELD_5_LENGTH2 = 0x1e,             // 0x00
    P_PKT_FIELD_5_CONFIG = 0x1f,              // 0x00
    P_PKT_FIELD_5_CRC_CONFIG = 0x20,          // 0x00
    P_PKT_RX_FIELD_1_LENGTH1 = 0x21,          // 0x00
    P_PKT_RX_FIELD_1_LENGTH2 = 0x22,          // 0x00
    P_PKT_RX_FIELD_1_CONFIG = 0x23,           // 0x00
    P_PKT_RX_FIELD_1_CRC_CONFIG = 0x24,       // 0x00
    P_PKT_RX_FIELD_2_LENGTH1 = 0x25,          // 0x00
    P_PKT_RX_FIELD_2_LENGTH2 = 0x26,          // 0x00
    P_PKT_RX_FIELD_2_CONFIG = 0x27,           // 0x00
    P_PKT_RX_FIELD_2_CRC_CONFIG = 0x28,       // 0x00
    P_PKT_RX_FIELD_3_LENGTH1 = 0x29,          // 0x00
    P_PKT_RX_FIELD_3_LENGTH2 = 0x2a,          // 0x00
    P_PKT_RX_FIELD_3_CONFIG = 0x2b,           // 0x00
    P_PKT_RX_FIELD_3_CRC_CONFIG = 0x2c,       // 0x00
    P_PKT_RX_FIELD_4_LENGTH1 = 0x2d,          // 0x00
    P_PKT_RX_FIELD_4_LENGTH2 = 0x2e,          // 0x00
    P_PKT_RX_FIELD_4_CONFIG = 0x2f,           // 0x00
    P_PKT_RX_FIELD_4_CRC_CONFIG = 0x30,       // 0x00
    P_PKT_RX_FIELD_5_LENGTH1 = 0x31,          // 0x00
    P_PKT_RX_FIELD_5_LENGTH2 = 0x32,          // 0x00
    P_PKT_RX_FIELD_5_CONFIG = 0x33,           // 0x00
    P_PKT_RX_FIELD_5_CRC_CONFIG = 0x34,       // 0x00
    P_PKT_CRC_SEED1 = 0x36,                   // 0x00
    P_PKT_CRC_SEED2 = 0x37,                   // 0x00
    P_PKT_CRC_SEED3 = 0x38,                   // 0x00
    P_PKT_CRC_SEED4 = 0x39,                   // 0x00
                                              // default
    P_MODEM_MOD_TYPE = 0x00,                  // 0x02
    P_MODEM_MAP_CONTROL = 0x01,               // 0x80
    P_MODEM_DSM_CTRL = 0x02,                  // 0x07
    P_MODEM_DATA_RATE1 = 0x03,                // 0x0f
    P_MODEM_DATA_RATE2 = 0x04,                // 0x42
    P_MODEM_DATA_RATE3 = 0x05,                // 0x40
    P_MODEM_TX_NCO_MODE1 = 0x06,              // 0x01
    P_MODEM_TX_NCO_MODE2 = 0x07,              // 0xc9
    P_MODEM_TX_NCO_MODE3 = 0x08,              // 0xc3
    P_MODEM_TX_NCO_MODE4 = 0x09,              // 0x80
    P_MODEM_FREQ_DEV1 = 0x0a,                 // 0x00
    P_MODEM_FREQ_DEV2 = 0x0b,                 // 0x06
    P_MODEM_FREQ_DEV3 = 0x0c,                 // 0xd3
    P_MODEM_FREQ_OFFSET1 = 0x0d,              // 0x00
    P_MODEM_FREQ_OFFSET2 = 0x0e,              // 0x00
    P_MODEM_TX_FILTER_COEFF_8 = 0x0f,         // 0x67
    P_MODEM_TX_FILTER_COEFF_7 = 0x10,         // 0x60
    P_MODEM_TX_FILTER_COEFF_6 = 0x11,         // 0x4d
    P_MODEM_TX_FILTER_COEFF_5 = 0x12,         // 0x36
    P_MODEM_TX_FILTER_COEFF_4 = 0x13,         // 0x21
    P_MODEM_TX_FILTER_COEFF_3 = 0x14,         // 0x11
    P_MODEM_TX_FILTER_COEFF_2 = 0x15,         // 0x08
    P_MODEM_TX_FILTER_COEFF_1 = 0x16,         // 0x03
    P_MODEM_TX_FILTER_COEFF_0 = 0x17,         // 0x01
    P_MODEM_TX_RAMP_DELAY = 0x18,             // 0x01
    P_MODEM_MBM_CTRL = 0x19,                  // 0x00
    P_MODEM_IF_CONTROL = 0x1a,                // 0x08
    P_MODEM_IF_FREQ1 = 0x1b,                  // 0x03
    P_MODEM_IF_FREQ2 = 0x1c,                  // 0xc0
    P_MODEM_IF_FREQ3 = 0x1d,                  // 0x00
    P_MODEM_DECIMATION_CFG1 = 0x1e,           // 0x10
    P_MODEM_DECIMATION_CFG0 = 0x1f,           // 0x20
    P_MODEM_DECIMATION_CFG2 = 0x20,           // 0x00
    P_MODEM_IFPKD_THRESHOLDS = 0x21,          // 0xe8
    P_MODEM_BCR_OSR1 = 0x22,                  // 0x00
    P_MODEM_BCR_OSR2 = 0x23,                  // 0x4b
    P_MODEM_BCR_NCO_OFFSET1 = 0x24,           // 0x06
    P_MODEM_BCR_NCO_OFFSET2 = 0x25,           // 0xd3
    P_MODEM_BCR_NCO_OFFSET3 = 0x26,           // 0xa0
    P_MODEM_BCR_GAIN1 = 0x27,                 // 0x06
    P_MODEM_BCR_GAIN2 = 0x28,                 // 0xd3
    P_MODEM_BCR_GEAR = 0x29,                  // 0x02
    P_MODEM_BSR_MISC1 = 0x2a,                 // 0xc0
    P_MODEM_BSR_MISC0 = 0x2b,                 // 0x00
    P_MODEM_AFC_GEAR = 0x2c,                  // 0x00
    P_MODEM_AFC_WAIT = 0x2d,                  // 0x23
    P_MODEM_AFC_GAIN1 = 0x2e,                 // 0x83
    P_MODEM_AFC_GAIN2 = 0x2f,                 // 0x69
    P_MODEM_AFC_LIMITER1 = 0x30,              // 0x00
    P_MODEM_AFC_LIMITER2 = 0x31,              // 0x40
    P_MODEM_AFC_MISC = 0x32,                  // 0xa0
    P_MODEM_AFC_ZIPOFF = 0x33,                // 0x00
    P_MODEM_ADC_CTRL = 0x34,                  // 0x00
    P_MODEM_AGC_CONTROL = 0x35,               // 0xe0
    P_MODEM_AGC_WINDOW_SIZE = 0x38,           // 0x11
    P_MODEM_AGC_RFPD_DECAY = 0x39,            // 0x10
    P_MODEM_AGC_IFPD_DECAY = 0x3a,            // 0x10
    P_MODEM_FSK4_GAIN1 = 0x3b,                // 0x0b
    P_MODEM_FSK4_GAIN0 = 0x3c,                // 0x1c
    P_MODEM_FSK4_TH1 = 0x3d,                  // 0x40
    P_MODEM_FSK4_TH2 = 0x3e,                  // 0x00
    P_MODEM_FSK4_MAP = 0x3f,                  // 0x00
    P_MODEM_OOK_PDTC = 0x40,                  // 0x2b
    P_MODEM_OOK_BLOPK = 0x41,                 // 0x0c
    P_MODEM_OOK_CNT1 = 0x42,                  // 0xa4
    P_MODEM_OOK_MISC = 0x43,                  // 0x03
    P_MODEM_RAW_CONTROL = 0x45,               // 0x02
    P_MODEM_RAW_EYE1 = 0x46,                  // 0x00
    P_MODEM_RAW_EYE2 = 0x47,                  // 0xa3
    P_MODEM_ANT_DIV_MODE = 0x48,              // 0x02
    P_MODEM_ANT_DIV_CONTROL = 0x49,           // 0x80
    P_MODEM_RSSI_THRESH = 0x4a,               // 0xff
    P_MODEM_RSSI_JUMP_THRESH = 0x4b,          // 0x0c
    P_MODEM_RSSI_CONTROL = 0x4c,              // 0x01
    P_MODEM_RSSI_CONTROL2 = 0x4d,             // 0x00
    P_MODEM_RSSI_COMP = 0x4e,                 // 0x40
    P_MODEM_RAW_SEARCH2 = 0x50,               // 0x00
    P_MODEM_CLKGEN_BAND = 0x51,               // 0x08
    P_MODEM_SPIKE_DET = 0x54,                 // 0x00
    P_MODEM_ONE_SHOT_AFC = 0x55,              // 0x00
    P_MODEM_RSSI_HYSTERESIS = 0x56,           // 0xff
    P_MODEM_RSSI_MUTE = 0x57,                 // 0x00
    P_MODEM_FAST_RSSI_DELAY = 0x58,           // 0x00
    P_MODEM_PSM1 = 0x59,                      // 0x00
    P_MODEM_PSM2 = 0x5a,                      // 0x00
    P_MODEM_DSA_CTRL1 = 0x5b,                 // 0x00
    P_MODEM_DSA_CTRL2 = 0x5c,                 // 0x00
    P_MODEM_DSA_QUAL = 0x5d,                  // 0x00
    P_MODEM_DSA_RSSI = 0x5e,                  // 0x00
    P_MODEM_DSA_MISC = 0x5f,                  // 0x00
                                              // default
    P_MODEM_CHFLT_RX1_CHFLT_COE1 = 0x00,      // 0xff
    P_MODEM_CHFLT_RX1_CHFLT_COE2 = 0x01,      // 0xba
    P_MODEM_CHFLT_RX1_CHFLT_COE3 = 0x02,      // 0x0f
    P_MODEM_CHFLT_RX1_CHFLT_COE4 = 0x03,      // 0x51
    P_MODEM_CHFLT_RX1_CHFLT_COE5 = 0x04,      // 0xcf
    P_MODEM_CHFLT_RX1_CHFLT_COE6 = 0x05,      // 0xa9
    P_MODEM_CHFLT_RX1_CHFLT_COE7 = 0x06,      // 0xc9
    P_MODEM_CHFLT_RX1_CHFLT_COE8 = 0x07,      // 0xfc
    P_MODEM_CHFLT_RX1_CHFLT_COE9 = 0x08,      // 0x1b
    P_MODEM_CHFLT_RX1_CHFLT_COE10 = 0x09,     // 0x1e
    P_MODEM_CHFLT_RX1_CHFLT_COE11 = 0x0a,     // 0x0f
    P_MODEM_CHFLT_RX1_CHFLT_COE12 = 0x0b,     // 0x01
    P_MODEM_CHFLT_RX1_CHFLT_COE13 = 0x0c,     // 0xfc
    P_MODEM_CHFLT_RX1_CHFLT_COE14 = 0x0d,     // 0xfd
    P_MODEM_CHFLT_RX1_CHFLT_COE15 = 0x0e,     // 0x15
    P_MODEM_CHFLT_RX1_CHFLT_COE16 = 0x0f,     // 0xff
    P_MODEM_CHFLT_RX1_CHFLT_COE17 = 0x10,     // 0x00
    P_MODEM_CHFLT_RX1_CHFLT_COE18 = 0x11,     // 0x0f
    P_MODEM_CHFLT_RX2_CHFLT_COE1 = 0x12,      // 0xff
    P_MODEM_CHFLT_RX2_CHFLT_COE2 = 0x13,      // 0xc4
    P_MODEM_CHFLT_RX2_CHFLT_COE3 = 0x14,      // 0x30
    P_MODEM_CHFLT_RX2_CHFLT_COE4 = 0x15,      // 0x7f
    P_MODEM_CHFLT_RX2_CHFLT_COE5 = 0x16,      // 0xf5
    P_MODEM_CHFLT_RX2_CHFLT_COE6 = 0x17,      // 0xb5
    P_MODEM_CHFLT_RX2_CHFLT_COE7 = 0x18,      // 0xb8
    P_MODEM_CHFLT_RX2_CHFLT_COE8 = 0x19,      // 0xde
    P_MODEM_CHFLT_RX2_CHFLT_COE9 = 0x1a,      // 0x05
    P_MODEM_CHFLT_RX2_CHFLT_COE10 = 0x1b,     // 0x17
    P_MODEM_CHFLT_RX2_CHFLT_COE11 = 0x1c,     // 0x16
    P_MODEM_CHFLT_RX2_CHFLT_COE12 = 0x1d,     // 0x0c
    P_MODEM_CHFLT_RX2_CHFLT_COE13 = 0x1e,     // 0x03
    P_MODEM_CHFLT_RX2_CHFLT_COE14 = 0x1f,     // 0x00
    P_MODEM_CHFLT_RX2_CHFLT_COE15 = 0x20,     // 0x15
    P_MODEM_CHFLT_RX2_CHFLT_COE16 = 0x21,     // 0xff
    P_MODEM_CHFLT_RX2_CHFLT_COE17 = 0x22,     // 0x00
    P_MODEM_CHFLT_RX2_CHFLT_COE18 = 0x23,     // 0x00
                                              // default
    P_PA_MODE = 0x00,                         // 0x08
    P_PA_PWR_LVL = 0x01,                      // x07f
    P_PA_BIAS_CLKDUTY = 0x02,                 // 0x00
    P_PA_TC = 0x03,                           // 0x5d
    P_PA_RAMP_EX = 0x04,                      // 0x80
    P_PA_RAMP_DOWN_DELAY = 0x05,              // 0x23
    P_PA_DIG_PWR_SEQ_CONFIG = 0x06,           // 0x03
                                              // default
    P_SYNTH_PFDCP_CPFF = 0x00,                // 0x2c
    P_SYNTH_PSDCP_CPINT = 0x01,               // 0x0e
    P_SYNTH_VCO_KV = 0x02,                    // 0x0b
    P_SYNTH_LPFILT3 = 0x03,                   // 0x04
    P_SYNTH_LPFILT2 = 0x04,                   // 0x0c
    P_SYNTH_LPFILT1 = 0x05,                   // 0x73
    P_SYNTH_LPFILT0 = 0x06,                   // 0x03
    P_SYNTH_VCO_KVCAL = 0x07,                 // 0x05
                                              // default
    P_MATCH_VALUE_1 = 0x00,                   // 0x00
    P_MATCH_MASK_1 = 0x01,                    // 0x00
    P_MATCH_CTRL_1 = 0x02,                    // 0x00
    P_MATCH_VALUE_2 = 0x03,                   // 0x00
    P_MATCH_MASK_2 = 0x04,                    // 0x00
    P_MATCH_CTRL_2 = 0x05,                    // 0x00
    P_MATCH_VALUE_3 = 0x06,                   // 0x00
    P_MATCH_MASK_3 = 0x07,                    // 0x00
    P_MATCH_CTRL_3 = 0x08,                    // 0x00
    P_MATCH_VALUE_4 = 0x09,                   // 0x00
    P_MATCH_MASK_4 = 0x0a,                    // 0x00
    P_MATCH_CTRL_4 = 0x0b,                    // 0x00
                                              // default
    P_FREQ_CONTROL_INTE = 0x00,               // 0x3c
    P_FREQ_CONTROL_FRAC1 = 0x01,              // 0x08
    P_FREQ_CONTROL_FRAC2 = 0x02,              // 0x00
    P_FREQ_CONTROL_FRAC3 = 0x03,              // 0x00
    P_FREQ_CONTROL_CHANNEL_STEP_SIZE1 = 0x04, // 0x00
    P_FREQ_CONTROL_CHANNEL_STEP_SIZE2 = 0x05, // 0x00
    P_FREQ_CONTROL_W_SIZE = 0x06,             // 0x20
    P_FREQ_CONTROL_VCOCNT_RX_ADJ = 0x07,      // 0xff
                                              // default
    P_RX_HOP_CONTROL = 0x00,                  // 0x04
    P_RX_HOP_TABLE_SIZE = 0x01,               // 0x01
    P_RX_HOP_TABLE_ENTRY_0 = 0x02,            // 0x00
    P_RX_HOP_TABLE_ENTRY_63 = 0x41,           // 0x3f
                                              // default
    P_PTI_CTL = 0x00,                         // 0x80
    P_PTI_BAUD1 = 0x01,                       // 0x13
    P_PTI_BAUD2 = 0x02,                       // 0x88
    P_PTI_LOG_EN = 0x03,                      // 0x00
};

#endif