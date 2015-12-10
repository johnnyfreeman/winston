const links = {
    // visual force
    'apex:actionFunction': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionFunction.htm',
    'apex:actionPoller': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionPoller.htm',
    'apex:actionRegion': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionRegion.htm',
    'apex:actionStatus': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionStatus.htm',
    'apex:actionSupport': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionSupport.htm',
    'apex:areaSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_areaSeries.htm',
    'apex:attribute': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_attribute.htm',
    'apex:axis': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_axis.htm',
    'apex:barSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_barSeries.htm',
    'apex:canvasApp': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_canvasApp.htm',
    'apex:chart': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_chart.htm',
    'apex:chartLabel': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_chartLabel.htm',
    'apex:chartTips': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_chartTips.htm',
    'apex:column': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_column.htm',
    'apex:commandButton': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_commandButton.htm',
    'apex:commandLink': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_commandLink.htm',
    'apex:component': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_component.htm',
    'apex:componentBody': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_componentBody.htm',
    'apex:composition': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_composition.htm',
    'apex:dataList': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_dataList.htm',
    'apex:dataTable': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_dataTable.htm',
    'apex:define': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_define.htm',
    'apex:detail': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_detail.htm',
    'apex:dynamicComponent': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_dynamicComponent.htm',
    'apex:emailPublisher': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_emailPublisher.htm',
    'apex:enhancedList': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_enhancedList.htm',
    'apex:facet': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_facet.htm',
    'apex:flash': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_flash.htm',
    'apex:form': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_form.htm',
    'apex:gaugeSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_gaugeSeries.htm',
    'apex:iframe': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_iframe.htm',
    'apex:image': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_image.htm',
    'apex:include': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_include.htm',
    'apex:includeScript': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_includeScript.htm',
    'apex:inlineEditSupport': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inlineEditSupport.htm',
    'apex:input': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_input.htm',
    'apex:inputCheckbox': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputCheckbox.htm',
    'apex:inputField': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputField.htm',
    'apex:inputFile': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputFile.htm',
    'apex:inputHidden': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputHidden.htm',
    'apex:inputSecret': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputSecret.htm',
    'apex:inputText': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputText.htm',
    'apex:inputTextarea': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputTextarea.htm',
    'apex:insert': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_insert.htm',
    'apex:legend': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_legend.htm',
    'apex:lineSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_lineSeries.htm',
    'apex:listViews': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_listViews.htm',
    'apex:logCallPublisher': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_logCallPublisher.htm',
    'apex:map': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_map.htm',
    'apex:mapMarker': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_mapMarker.htm',
    'apex:message': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_message.htm',
    'apex:messages': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_messages.htm',
    'apex:milestoneTracker': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_milestoneTracker.htm',
    'apex:outputField': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputField.htm',
    'apex:outputLabel': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputLabel.htm',
    'apex:outputLink': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputLink.htm',
    'apex:outputPanel': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputPanel.htm',
    'apex:outputText': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputText.htm',
    'apex:page': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_page.htm',
    'apex:pageBlock': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlock.htm',
    'apex:pageBlockButtons': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlockButtons.htm',
    'apex:pageBlockSection': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlockSection.htm',
    'apex:pageBlockSectionItem': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlockSectionItem.htm',
    'apex:pageBlockTable': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlockTable.htm',
    'apex:pageMessage': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageMessage.htm',
    'apex:pageMessages': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageMessages.htm',
    'apex:panelBar': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_panelBar.htm',
    'apex:panelBarItem': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_panelBarItem.htm',
    'apex:panelGrid': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_panelGrid.htm',
    'apex:panelGroup': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_panelGroup.htm',
    'apex:param': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_param.htm',
    'apex:pieSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pieSeries.htm',
    'apex:radarSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_radarSeries.htm',
    'apex:relatedList': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_relatedList.htm',
    'apex:remoteObjectField': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_remoteObjectField.htm',
    'apex:remoteObjectModel': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_remoteObjectModel.htm',
    'apex:remoteObjects': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_remoteObjects.htm',
    'apex:repeat': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_repeat.htm',
    'apex:scatterSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_scatterSeries.htm',
    'apex:scontrol': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_scontrol.htm',
    'apex:sectionHeader': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_sectionHeader.htm',
    'apex:selectCheckboxes': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectCheckboxes.htm',
    'apex:selectList': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectList.htm',
    'apex:selectOption': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectOption.htm',
    'apex:selectOptions': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectOptions.htm',
    'apex:selectRadio': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectRadio.htm',
    'apex:stylesheet': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_stylesheet.htm',
    'apex:tab': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_tab.htm',
    'apex:tabPanel': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_tabPanel.htm',
    'apex:toolbar': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_toolbar.htm',
    'apex:toolbarGroup': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_toolbarGroup.htm',
    'apex:variable': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_variable.htm',
    'apex:vote': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_vote.htm',

    'FeedItem': 'https://www.salesforce.com/developer/docs/api/Content/sforce_api_objects_feeditem.htm',
    'FeedPost': 'https://www.salesforce.com/developer/docs/api/Content/sforce_api_objects_feedpost.htm',

    // system namespace
    'Address Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_system_Address.htm',
    'Answers Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_answers.htm',
    'ApexPages Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_apexpages.htm',
    'Approval Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_approval.htm',
    'Blob Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_blob.htm',
    'Boolean Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_boolean.htm',
    'BusinessHours Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_businesshours.htm',
    'Cases Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_system_cases.htm',
    'Comparable Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_comparable.htm',
    'Continuation Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_Continuation.htm',
    'Cookie Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_sites_cookie.htm',
    'Crypto Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_restful_crypto.htm',
    'Custom Settings Methods': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_custom_settings.htm',
    'Database Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_database.htm',
    'Date Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_date.htm',
    'Datetime Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_datetime.htm',
    'Decimal Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_decimal.htm',
    'Double Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_double.htm',
    'EncodingUtil Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_restful_encodingUtil.htm',
    'Enum Methods': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_enum.htm',
    'Exception and Built-In Exceptions Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_exception_methods.htm',
    'Http Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_restful_http_http.htm',
    'HttpCalloutMock Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_interface_httpcalloutmock.htm',
    'HttpRequest Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_restful_http_httprequest.htm',
    'HttpResponse Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_restful_http_httpresponse.htm',
    'Id Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_id.htm',
    'Ideas Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_ideas.htm',
    'InstallHandler Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_install_handler.htm',
    'Integer Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_integer.htm',
    'JSON Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_Json.htm',
    'JSONGenerator Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_JSONGenerator.htm',
    'JSONParser Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_JsonGenerator.htm',
    'JSONToken Enum': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_JsonParser.htm',
    'Limits Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_limits.htm',
    'List Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_list.htm',
    'Location Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_system_Location.htm',
    'Long Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_long.htm',
    'Map Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_map.htm',
    'Matcher Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_pattern_and_matcher_matcher_methods.htm',
    'Math Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_math.htm',
    'Messaging Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_email_outbound_messaging.htm',
    'MultiStaticResourceCalloutMock Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_multistaticresourcecalloutmock.htm',
    'Network Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_network.htm',
    'PageReference Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_system_pagereference.htm',
    'Pattern Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_pattern_and_matcher_pattern_methods.htm',
    'Queueable Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_Queueable.htm',
    'QueueableContext Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_interface_system_queueablecontext.htm',
    'QuickAction Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_system_quickaction.htm',
    'RemoteObjectController': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_system_remoteobjectcontroller.htm',
    'ResetPasswordResult Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_ResetPasswordResult.htm',
    'RestContext Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_restcontext.htm',
    'RestRequest Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_restrequest.htm',
    'RestResponse Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_restresponse.htm',
    'Schedulable Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_interface_system_schedulable.htm',
    'SchedulableContext Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_interface_system_schedulablecontext.htm',
    'Schema Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_schema.htm',
    'Search Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_search.htm',
    'SelectOption Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_pages_selectoption.htm',
    'Set Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_set.htm',
    'Site Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_sites.htm',
    'sObject Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_sobject.htm',
    'StaticResourceCalloutMock Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_staticresourcecalloutmock.htm',
    'String Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_string.htm',
    'System Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_system.htm',
    'Test Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_test.htm',
    'Time Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_time.htm',
    'TimeZone Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_timezone.htm',
    'Trigger Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_Trigger.htm',
    'Type Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_type.htm',
    'UninstallHandler Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_uninstall_handler.htm',
    'URL Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_url.htm',
    'UserInfo Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_userinfo.htm',
    'Version Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_version.htm',
    'WebServiceCallout Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_WebServiceCallout.htm',
    'WebServiceMock Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_interface_webservicemock.htm',
    'XmlStreamReader Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_xml_XmlStream_reader.htm',
    'XmlStreamWriter Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_xml_XmlStream_writer.htm'
};

module.exports = links;