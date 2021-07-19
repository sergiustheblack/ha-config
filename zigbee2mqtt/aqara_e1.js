const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const legacy = require('zigbee-herdsman-converters/lib/legacy');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;	
const ea = exposes.access;

const definition = {
    
        zigbeeModel: ['lumi.switch.b2lc04'],
        model: 'QBKG39LM',
        vendor: 'Aqara',
        description: 'Aqara E1 2 gang switch without zero line',
        fromZigbee: [fz.on_off],
        toZigbee: [tz.on_off],
        meta: {multiEndpoint: true},
        endpoint: (device) => {
            return {'left': 1, 'right': 2};
        },
        exposes: [e.switch().withEndpoint('left'), e.switch().withEndpoint('right')],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint1 = device.getEndpoint(1);
            // Change to 1 mode
            await endpoint1.write('aqaraOpple', {'mode': 1}, {manufacturerCode: 0x115f, 
                disableDefaultResponse: true, disableResponse: true});
        }
};
module.exports = definition;

