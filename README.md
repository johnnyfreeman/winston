# Winston

Winston is your personal valet for the web. Taking inspiration from launchers and GCLIs such as [Alfred](http://www.alfredapp.com/) and those embedded in [Atom](https://atom.io/) and [Sublime Text](http://www.sublimetext.com/).

### Installation

The best way to install Winston is directly from the [Chrome Web Store](https://chrome.google.com/webstore/detail/winston/kkojmlcbloeljojhbmkkjgbjkafgcjom). Alternatively, you can clone the repo locally and manually install in Chrome:

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
* `debug [fileName]`: Open any .html file in it's own tab for debugging purposes

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

* `youtube`: Open youtube.com

The following keywords will open YouTube's search results for "sneezing panda". Notice those keywords will be removed from the search query.

* `youtube sneezing panda`
* `sneezing panda video`

Other (soft) keywords will trigger the youtube package (without using the keywords above) and will remain part of the search query.

* `tomorrowland trailer`: Open YouTube's search results for "tomorrowland trailer"
* `interstellar movie`: Open YouTube's search results for "interstellar movie"
* `john mayer daughters cover`: Open YouTube's search results for "john mayer daughters cover"
* `john mayer music`: Open YouTube's search results for "john mayer music"
* `javascript tutorial`: Open YouTube's search results for "javascript tutorial"
* `how to dance`: Open YouTube's search results for "how to dance"


##### Salesforce

Provides links to documentation articles and to common areas in your Salesforce org. After enabling the Salesforce package in [options](chrome://extensions/?options=kkojmlcbloeljojhbmkkjgbjkafgcjom) you will need to get an access token for the salesforce org you want to connect to, then click the Fetch Data button.

* `view [sobject] object`: Open properties for a standard object or custom object
* `list [sobject] records`: List records for a standard or custom object
* `new [sobject] record`: New standard or custom object record

##### StackOverflow

Listens to certain keywords in user input and offers to open search results for StackOverflow.

* `stackoverflow`: Open stackoverflow.com

The following keywords will open StackOverflow's search results for "foo bar". Notice those keywords will be removed from the search query.

* `stackoverflow foo bar`

Other (soft) keywords will trigger the youtube package (without using the keywords above) and will remain part of the search query.

* `foo bar issue`: Open StackOverflow's search results for "foo bar issue"
* `foo bar exception`: Open StackOverflow's search results for "foo bar exception"
* `foo bar error`: Open StackOverflow's search results for "foo bar error"

##### History

Search through most recent _X_ number items in browser history and open url in a new tab. Also, open all history in a new tab by typing "history". After enabling the history package, update the number of history items to keep stored in browser storage, then click Fetch History.

### Planned Packages

##### DevTools

To start with, it would be nice to be able to lookup and execute devtools snippets.

##### Snippets

Save chunks of text to recall on command. Pastes into previously focused input field or copies text to the clipboard

##### Links

Follow any link in current tab.
