window.notificationTypes = {
    dtc: {
        name: 'Diagnostic Alert (DTC)',
        description: 'DTC stands for Diagnostic Trouble Code. You will receive a DTC alert whenever the OBD reader detects an issue with any of your vehicle\'s systems, so you can address it before it becomes a more costly problem.'
    },
    visorBattery: {
        name: 'Low Speaker Battery',
        description: null
    },
    battery: {
        name: 'Battery Alert',
        description: null
    },
    coolant: {
        name: 'Coolant Alert',
        description: null
    },
    alternator: {
        name: 'Alternator Alert',
        description: null
    },
    recall: {
        name: 'Vehicle Recall',
        description: null
    },
    maintenance: {
        name: 'Maintenance Reminders',
        description: null
    },
    commLink: {
        name: 'OBD Reader Connectivity',
        description: 'The OBD (On Board Diagnostics) reader gathers information on your vehicle\'s systems. It should be properly connected to the OBD-II port at all times. If we haven\'t received any information from the OBD reader in a 10-day period, you will automatically receive a notification.'
    },
    vinMismatch: {
        name: 'VIN Mismatch',
        description: 'If you have a VIN Mismatch, this alert will notify you'
    }
};
console.log(window.notificationTypes);
