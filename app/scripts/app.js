var $ = require('jquery'),
    components = require('./components/my-component');

$(document).ready(function() {
    $('.rotator').html('!world hello');
    console.log(components().dtc);
});
