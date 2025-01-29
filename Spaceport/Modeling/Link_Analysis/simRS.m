% Reed solomon test
function errors = simRS(bitrate, flightTime, N, k, BERFunction)
    bytesPerFlight = flightTime * (bitrate/8);
    packets = round(bytesPerFlight/k) + 1;

    data = uint8(round(255*rand(packets, k)));

    m = log2(N+1);

    received_errs = 0;
    raw_errs = 0;
    BER_index = 1;
    count = 0;

    BER = zeros(packets, 1);
    rawErrorsTime = zeros(packets, 1);
    receivedErrorsTime = zeros(packets, 1);
    for n = 1:packets

        BER(n) = BERFunction(BER_index);
        count = count + 1;

        if (count >= floor(packets/245))
            count = 0;
            if (BER_index < 245)
                BER_index = BER_index + 1;
             end
        end
    end



    parfor n = 1:packets

        msgTX = gf(data(n,:), m);
        encoded = rsenc(msgTX, N, k);

        msgRXInitial = uint8(encoded.x);
        msgRX = uint8(encoded.x);

        for l = 1:length(msgRX)
            errors = uint8(0b00000000);

            if (rand() < BER(n))
                errors = bitor(errors, 0b10000000);
            end
            if (rand() < BER(n))
                errors = bitor(errors, 0b01000000);
            end
            if (rand() < BER(n))
                errors = bitor(errors, 0b00100000);
            end
            if (rand() < BER(n))
                errors = bitor(errors, 0b00010000);
            end
            if (rand() < BER(n))
                errors = bitor(errors, 0b00001000);
            end
            if (rand() < BER(n))
                errors = bitor(errors, 0b00000100);
            end
            if (rand() < BER(n))
                errors = bitor(errors, 0b00000010);
            end
            if (rand() < BER(n))
                errors = bitor(errors, 0b00000001);
            end
            
            % apply the error
            msgRX(l) = uint8(bitxor(msgRX(l), errors));
            
        end


        msgRXgf = gf(msgRX, m);
        decoded = rsdec(msgRXgf, N, k);
    
        raw_err = biterr(msgRXInitial, msgRX);
        received_err = biterr(data(n,:), uint8(decoded.x));
        rawErrorsTime(n) = raw_err;
        receivedErrorsTime(n) = received_err;
        raw_errs = raw_errs + raw_err;
        received_errs = received_errs + received_err;
        disp(n/packets*100)
    end
    
    disp(raw_errs)
    disp(received_errs)
    errors = [rawErrorsTime, receivedErrorsTime];
end