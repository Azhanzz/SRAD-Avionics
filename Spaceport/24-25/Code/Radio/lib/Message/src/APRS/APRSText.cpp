#include "APRSText.h"

APRSText::APRSText(APRSConfig config) : APRSData(config) {}

APRSText::APRSText(APRSConfig config, char msg[67], char addressee[9]) : APRSData(config)
{
    this->msgLen = strlen(msg);
    this->addrLen = strlen(addressee);

    if (this->msgLen > this->maxMsgLen)
        this->msgLen = this->maxMsgLen;
    if (this->msgLen == this->maxMsgLen)
        this->msg[this->maxMsgLen - 1] = 0;
    if (this->addrLen > this->maxAddrLen)
        this->addrLen = this->maxAddrLen;
    if (this->addrLen == this->maxAddrLen)
        this->addressee[this->maxAddrLen - 1] = 0;

    memcpy(this->msg, msg, this->msgLen);
    memcpy(this->addressee, addressee, this->addrLen);
}

uint16_t APRSText::encode(uint8_t *data, uint16_t sz)
{
    uint16_t pos = 0;

    // APRS header
    this->encodeHeader(data, sz, pos);

    // text message addressee:message

    if (sz < pos + this->addrLen + this->msgLen)
        return 0;
    if (this->config.type != TextMessage)
        return 0;

    data[pos++] = this->config.type;
    for (int i = 0; i < 9; i++)
    {
        if (i < this->addrLen)
            data[pos++] = (uint8_t)this->addressee[i];
        else
            data[pos++] = ' ';
    }
    data[pos++] = ':';

    for (int i = 0; i < this->msgLen; i++)
    {
        data[pos++] = (uint8_t)this->msg[i];
    }

    return pos;
}

uint16_t APRSText::decode(uint8_t *data, uint16_t sz)
{
    uint16_t pos = 0;

    this->decodeHeader(data, sz, pos);

    this->config.type = data[pos++];
    if (this->config.type != TextMessage)
        return 0;

    // get addressee
    this->addrLen = 0;
    while (pos < sz && data[pos] != ':' && this->addrLen < 9)
    {
        char c = data[pos++];
        if (c != ' ') // don't include padding spaces
            this->addressee[this->addrLen++] = c;
    }
    this->addressee[this->addrLen] = 0; // make addressee a valid c string

    pos++; // skip :

    // get message text
    this->msgLen = 0;
    while (pos < sz && this->msgLen < 67)
    {
        this->msg[this->msgLen++] = data[pos++];
    }
    this->msg[this->msgLen] = 0; // make msg a valid c string

    return pos;
}