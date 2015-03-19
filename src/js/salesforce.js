var Salesforce = function (searchInput) {
    this.searchInput = searchInput;

    // this.hardKeywords = ['sf'];
    // this.softKeywords = ['apex', 'system'];
    jsforce.browser.init({
      clientId: '3MVG9xOCXq4ID1uGbuCfSNW3olnFLJL8Sf2xPkbsYsYqPJrvDAoOE5U_CjIjP3Wv9wsALOpqX9nTPRmcQtPIi',
      redirectUri: 'https://login.salesforce.com/services/oauth2/success'
    });

    jsforce.browser.on('connect', function(conn) {
      conn.query('SELECT Id, Name FROM Account', function(err, res) {
        if (err) { return console.error(err); }
        console.log(res);
      });
    });

    // jsforce.browser.login();

    // documentation links
    // docLinks[input] = url
    this.docLinks = {};

    this.docLinks['apex:actionFunction'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionFunction.htm';
    this.docLinks['apex:actionPoller'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionPoller.htm';
    this.docLinks['apex:actionRegion'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionRegion.htm';
    this.docLinks['apex:actionStatus'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionStatus.htm';
    this.docLinks['apex:actionSupport'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionSupport.htm';
    this.docLinks['apex:areaSeries'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_areaSeries.htm';
    this.docLinks['apex:attribute'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_attribute.htm';
    this.docLinks['apex:axis'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_axis.htm';
    this.docLinks['apex:barSeries'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_barSeries.htm';
    this.docLinks['apex:canvasApp'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_canvasApp.htm';
    this.docLinks['apex:chart'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_chart.htm';
    this.docLinks['apex:chartLabel'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_chartLabel.htm';
    this.docLinks['apex:chartTips'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_chartTips.htm';
    this.docLinks['apex:column'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_column.htm';
    this.docLinks['apex:commandButton'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_commandButton.htm';
    this.docLinks['apex:commandLink'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_commandLink.htm';
    this.docLinks['apex:component'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_component.htm';
    this.docLinks['apex:componentBody'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_componentBody.htm';
    this.docLinks['apex:composition'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_composition.htm';
    this.docLinks['apex:dataList'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_dataList.htm';
    this.docLinks['apex:dataTable'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_dataTable.htm';
    this.docLinks['apex:define'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_define.htm';
    this.docLinks['apex:detail'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_detail.htm';
    this.docLinks['apex:dynamicComponent'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_dynamicComponent.htm';
    this.docLinks['apex:emailPublisher'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_emailPublisher.htm';
    this.docLinks['apex:enhancedList'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_enhancedList.htm';
    this.docLinks['apex:facet'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_facet.htm';
    this.docLinks['apex:flash'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_flash.htm';
    this.docLinks['apex:form'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_form.htm';
    this.docLinks['apex:gaugeSeries'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_gaugeSeries.htm';
    this.docLinks['apex:iframe'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_iframe.htm';
    this.docLinks['apex:image'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_image.htm';
    this.docLinks['apex:include'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_include.htm';
    this.docLinks['apex:includeScript'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_includeScript.htm';
    this.docLinks['apex:inlineEditSupport'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inlineEditSupport.htm';
    this.docLinks['apex:input'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_input.htm';
    this.docLinks['apex:inputCheckbox'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputCheckbox.htm';
    this.docLinks['apex:inputField'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputField.htm';
    this.docLinks['apex:inputFile'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputFile.htm';
    this.docLinks['apex:inputHidden'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputHidden.htm';
    this.docLinks['apex:inputSecret'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputSecret.htm';
    this.docLinks['apex:inputText'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputText.htm';
    this.docLinks['apex:inputTextarea'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputTextarea.htm';
    this.docLinks['apex:insert'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_insert.htm';
    this.docLinks['apex:legend'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_legend.htm';
    this.docLinks['apex:lineSeries'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_lineSeries.htm';
    this.docLinks['apex:listViews'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_listViews.htm';
    this.docLinks['apex:logCallPublisher'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_logCallPublisher.htm';
    this.docLinks['apex:map'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_map.htm';
    this.docLinks['apex:mapMarker'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_mapMarker.htm';
    this.docLinks['apex:message'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_message.htm';
    this.docLinks['apex:messages'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_messages.htm';
    this.docLinks['apex:milestoneTracker'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_milestoneTracker.htm';
    this.docLinks['apex:outputField'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputField.htm';
    this.docLinks['apex:outputLabel'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputLabel.htm';
    this.docLinks['apex:outputLink'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputLink.htm';
    this.docLinks['apex:outputPanel'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputPanel.htm';
    this.docLinks['apex:outputText'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputText.htm';
    this.docLinks['apex:page'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_page.htm';
    this.docLinks['apex:pageBlock'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlock.htm';
    this.docLinks['apex:pageBlockButtons'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlockButtons.htm';
    this.docLinks['apex:pageBlockSection'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlockSection.htm';
    this.docLinks['apex:pageBlockSectionItem'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlockSectionItem.htm';
    this.docLinks['apex:pageBlockTable'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlockTable.htm';
    this.docLinks['apex:pageMessage'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageMessage.htm';
    this.docLinks['apex:pageMessages'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageMessages.htm';
    this.docLinks['apex:panelBar'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_panelBar.htm';
    this.docLinks['apex:panelBarItem'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_panelBarItem.htm';
    this.docLinks['apex:panelGrid'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_panelGrid.htm';
    this.docLinks['apex:panelGroup'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_panelGroup.htm';
    this.docLinks['apex:param'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_param.htm';
    this.docLinks['apex:pieSeries'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pieSeries.htm';
    this.docLinks['apex:radarSeries'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_radarSeries.htm';
    this.docLinks['apex:relatedList'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_relatedList.htm';
    this.docLinks['apex:remoteObjectField'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_remoteObjectField.htm';
    this.docLinks['apex:remoteObjectModel'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_remoteObjectModel.htm';
    this.docLinks['apex:remoteObjects'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_remoteObjects.htm';
    this.docLinks['apex:repeat'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_repeat.htm';
    this.docLinks['apex:scatterSeries'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_scatterSeries.htm';
    this.docLinks['apex:scontrol'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_scontrol.htm';
    this.docLinks['apex:sectionHeader'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_sectionHeader.htm';
    this.docLinks['apex:selectCheckboxes'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectCheckboxes.htm';
    this.docLinks['apex:selectList'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectList.htm';
    this.docLinks['apex:selectOption'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectOption.htm';
    this.docLinks['apex:selectOptions'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectOptions.htm';
    this.docLinks['apex:selectRadio'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectRadio.htm';
    this.docLinks['apex:stylesheet'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_stylesheet.htm';
    this.docLinks['apex:tab'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_tab.htm';
    this.docLinks['apex:tabPanel'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_tabPanel.htm';
    this.docLinks['apex:toolbar'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_toolbar.htm';
    this.docLinks['apex:toolbarGroup'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_toolbarGroup.htm';
    this.docLinks['apex:variable'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_variable.htm';
    this.docLinks['apex:vote'] = 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_vote.htm';

    this.docLinks['FeedItem'] = 'https://www.salesforce.com/developer/docs/api/Content/sforce_api_objects_feeditem.htm';
    this.docLinks['FeedPost'] = 'https://www.salesforce.com/developer/docs/api/Content/sforce_api_objects_feedpost.htm';
    this.docLinks['sObject'] = 'http://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_sobject.htm';
};

Salesforce.prototype.inputHandler = function () {
    var deferred = Q.defer();
    var input = this.searchInput.value;
    var commands = [];

    if (this.docLinks.hasOwnProperty(input)) {
        commands.push(new SalesforceDocCommand(input, this.docLinks[input]));
    }

    deferred.resolve(commands);
    return deferred.promise;
};

var SalesforceDocCommand = function (title, url) {
    // this.id = 'SFDOC1';
    this.icon = 'cloud';
    this.action = 'Open';
    this.title = title;
    this.url = url;
    this.description = 'Salesforce: Open documentation';
};

SalesforceDocCommand.prototype.run = function () {
    chrome.tabs.create({ url: this.url });
};
