var tag = hexo.extend.tag;

tag.register('limg', function (args, content) {
  // "local" img helper. glues the root to the passed path
  // the rest is glued on as img tag attrs.

  var src = args.shift();  // always have to specify src

  // quotes get stripped off the args
  // let's just hack them back in for attributes
  for (let i in args) {
    if (args[i].includes("=")) {
      args[i] = args[i].replace('=', '="') + '"';
    }
    console.log(args[i], args);
  }

  var attrs = args.join(' ');

  return '<img src="' + hexo.config.root + src + '" ' + attrs + '>';
});
