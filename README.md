# Winston

Taking inspiration from launchers and command line interfaces such as [Alfred](http://www.alfredapp.com/) and those embedded in [Atom](https://atom.io/) and [Sublime Text](http://www.sublimetext.com/), Winston is your personal valet for the web.

### Installation

The best way to install Winston at the moment is...

1. Clone the GitHub repository.

```
git clone git@github.com:johnnyfreeman/winston.git
```

2. Open the URL [chrome://extensions/](chrome://extensions/) in your browser.

3. Check the box for Developer Mode

4. Click the button Load unpacked extension...

5. Select the folder where you cloned the repository.

The extension is now installed.

### Usage

Open Winston by clicking the icon in the toolbar (or `Ctrl` + `Space`), and start typing. See package descriptions for more information about what input each package responds to.

### Packages

Packages are groups of code that respond to input with possible commands you might be trying to execute.

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

Currently only offers links to documentation articles. Eventually the ability to search metadata from your org.

##### History

Currently disabled until performance is improved.

### Planned Packages

##### DevTools

To start with, it would be nice to be able to lookup and execute devtools snippets.

##### Snippets

Save chunks of text to recall on command. Pastes into previously focused input field or copies text to the clipboard

##### Current Page Links

Follow any link on current page.
