module.exports = {
    name: 'changeLight',
    description: 'change your light',
    execute(msg, args, strip) {
      msg.channel.send('would be trying to set lights to ' + args[0] + ' ' + args[1] + ' ' + args[2]);
      for (let i = 0; i < strip.length; i++) {
        showColor = 'rgb(' + args[0] +',' + args[1] + ',' + args[2] + ')'
        strip.pixel(i).color( showColor);
      }
      strip.show();
    },
};
