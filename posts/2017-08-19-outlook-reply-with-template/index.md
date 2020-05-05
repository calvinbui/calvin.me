---
title: Microsoft Outlook - Send a reply using an email template
categories:
-   Programming
tags:
-   outlook
-   email
# thumbnail: thumbnail.png
---

A simple macro to send a range of email templates, prefilled with different items like your subject line, recipients, CC and BCC.

<!-- more -->

_I have tested this script on Windows 8.1 running Outlook 2013_

## Overview

This simple macro will reply to an email with a template of your choice. The macro will activate a listbox to appear where you can select which template to use. Depending on your settings, you can then specify who will be CC'd/BCC'd on the reply, which email account it was sent from and the subject line. More areas can be changed but I did not want to complicate things.

## Scripts

You can find the items necessary on my GitHub repo [calvinbui/outlook-reply-with-template](https://github.com/calvinbui/outlook-reply-with-template).

The scripts will require the following customisations:

* `TemplatesFolder` in EmailTemplates.bas: point this to the absolute path of the templates folder
* `.SentOnBehalfOfName` in EmailTemplates.bas: change this to your email address you are sending from.
* `.CC` in EmailTemplates.bas: change this to whoever you want to CC on the email.

## How to Add

1.  In Outlook, press ALT+F11 to open Visual Basic
2.  Go to File > Import File, a pop-up will appear to choose which files to import
3.  Select `EmailTemplates.bas` from the repo. The module will be added under the Modules folder.
4.  Go to File > Import File again and select `EmailTemplatesForm.frm` within the same folder
5.  Go to Tools > References and tick the `Microsoft Word #### Object Library` then click 'OK'.
6.  You can now close all the Visual Basic windows to get back into Outlook.
6.  Right click the Ribbon and select 'Customize the Ribbon…'
7.  Select 'Macros' under the 'Choose commands from:' dropdown on the left-hand column
8.  Create a ‘New Group’ on the right column where you would like the buttons to appear.
9.  Select the `Project1.EmailTemplates` macro on the left hand side and click the 'Add' button to add them to the ribbon
10.	Click on each Macro once it has been added and click on the ‘Rename’ button to change its label and icon.
11.	Click OK when finished

## Adding New Templates

1.  Write a new email in Outlook
2.  Save the email as an ‘.oft’ file in one of the folders your `templates` folder
3.  The template will now appear automatically in the dropdown list
