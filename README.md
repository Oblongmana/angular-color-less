# angular-color-less

An AngularJS app for quickly viewing/playing with hex colours, that lets you use LESS functions.

This was a one-night hack, so still fairly unrefined. That said, it does definitely work.

Specific issues include (but are definitely not limited to):
 - Any time you type anything, the function parsing thing immediately tries to parse it. That's bad, because if you've only typed part of it, you'll get lots of errors being spit out into console. LOTS OF THEM.
 - More generally, it would probably be good to elegantly handle exceptions rather than letting angular spit when you've only typed half the less function, and put that in the interface.
 - No real tests as such. There are the trivial ones that Yeoman/generator-angular slaps in there, but nothing sophisticated
 - I'm not _super_ familiar with either using AngularJS, or Yeoman/grunt, so it's entirely possibly I have abused one or both and there may be side effects as a result.
 - No usage explanations on the page
 - No tooltips or any other indicator of function on the action bar for each color (other than the images)

I'm going to track problems using github issues, feel free to add any, fork this, etc.