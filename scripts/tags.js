var tag = hexo.extend.tag;

tag.register('limg', function (args, content) {
    //"local" img helper. glues the root to the passed path
    //the rest is glued on as img tag attrs.

    var src = args.shift();  //always have to specify src
    var attrs = args.join(' '); //everything else is 'as is'

    return '<img src="' + hexo.config.root + src + '" ' + attrs + '>';

}, false);
