# Winston

Winston is your personal valet for the web. Taking inspiration from launchers and GCLIs such as [Alfred](http://www.alfredapp.com/) and those embedded in [Atom](https://atom.io/) and [Sublime Text](http://www.sublimetext.com/).

### Installation

The best way to install Winston at the moment is...

1. Clone (`git clone git@github.com:johnnyfreeman/winston.git`), or [download](https://github.com/johnnyfreeman/winston/archive/master.zip) and unzip Winston.

2. Open the URL [chrome://extensions/](chrome://extensions/) in your browser.

3. Check the box for Developer Mode

4. Click the button Load unpacked extension...

5. Select the [winston/extension/](https://github.com/johnnyfreeman/winston/tree/master/extension) directory.

The extension is now installed. Open Winston by clicking the icon in the toolbar (or `Ctrl` + `Space`), type `help` and press `Enter`.

### Usage

Type anything into Winston. Enabled packages will respond to your input with possible commands you might be trying to execute. See package descriptions for more information about what input each package responds to.

### Packages

##### Core

* `help`: Open help
* `settings`: Open Winston settings
* `enable [packageName]`: Enable a package
* `disable [packageName]`: Disable a package
* `debug`: Open Winston in it's own tab

##### Calculator

Evaluates user input as a mathmatical expression. See [math.js](http://mathjs.org/) for examples.

##### Tabs

Search open tabs, duplicate a tab, open new tab, close tab, or pin tab.

##### Bookmarks

Search through your bookmarks or create new bookmark.

##### Google

As a fallback, open Google results for user input. Offers an "I'm feeling lucky" command as well.

##### YouTube

Listens to certain keywords in user input and offers to open search results for YouTube.

##### Salesforce

Provides links to documentation articles. After enabling the Salesforce package in [options](chrome://extensions/?options=kkojmlcbloeljojhbmkkjgbjkafgcjom) you will be prompted to enter your sandbox credentials so that Winston can provide you links to jump around common areas.

* `view [sobject] object`: Open properties for an sObject
* `list [sobject] records`: List records for sObject
* `new [sobject] record`: New sObject record

##### History

Search through browser history and open url in a new tab.

### Planned Packages

##### DevTools

To start with, it would be nice to be able to lookup and execute devtools snippets.

##### Snippets

Save chunks of text to recall on command. Pastes into previously focused input field or copies text to the clipboard

##### Current Page Links

Follow any link on current page.
