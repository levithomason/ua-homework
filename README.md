Urban Airship Design Exercise
=============================

**[Try the demo](http://ua-homework.herokuapp.com/)**

# Hacking
1. Install gulp: `npm i gulp -g`
2. Run the setup: `npm run setup`.
3. After the app launches in chrome, hack on `/src`.

Watches and live reload will rebuild the app and refresh your browser on the fly.

**What just happend?**

- `npm install .` - Installs all the node modules.
- `bower install` - Installs our bower components.
- `gulp` - Runs the default gulp task:
    - Creates a `/build`.
    - Serves `/build` at [localhost:8000](localhost:8000) with live reload.
    - Watches `/src` directories for changes and triggers super fast incremental rebuilds.
    - Opens the app in Chrome.

**Gulp Commands**

- `gulp serve` - Start the dev server at [localhost:8000](localhost:8000)
- `gulp watch` - Watches `/src` directories for changes and rebuilds changed files
- `gulp build` - Manually rebuild.
- `gulp open` - Launch the app in your browser.

**The build**

Gulp is taking care of less compiling, prefixing and minifying css, js concatenation and uglifying.

# Design Brief
A single page app for creating, editing, and scheduling messages.

**Form**

A message form is always present for ease of access.

**Validation**

The submit button is disabled for the following cases:
    - required title or body is missing.
    - body is greater than 256 bytes, calculated as UTF-8 string size.
    - message is a scheduled message and missing required date or time fields.

**Drafts**

A draft may be saved at any time by clicking 'save draft'.  You can click on a draft message to edit it again.

**Bonus Features**

Enter or Ctrl + Enter will submit the message form, if valid.
Body text area auto-sizes to content size, no resize gripper is needed.
Body byte size counter including an error state.

# Design Exercise

Below is a product brief for a fictional feature which needs to be designed. Your deliverables for this exercise are a prototype built using cross-browser standards (html, css, javascript, etc) and a design brief that explains your solution. You can be as creative or as practical as you see fit, but we do ask that you avoid using frameworks to build your prototype. Please don’t hesitate to ask any questions you might have about the exercise.

**Problem Statement**

I want to be able to send messages to my mobile app audience.

**Background**

Within the Urban Airship platform, users want to be able to send messages to their audience (devices). Messages come in the form of notifications. Messages can be scheduled to be delivered at a future date, or they can be sent immediately. Additionally, messages can be composed and saved as a draft for later.

An audience is composed of users and their devices. Devices are limited to two platforms: Android and iOS. Messages sent to Android devices are limited to 4096 bytes of data. Messages sent to iOS devices are limited to 256 bytes of data. Messages that exceed the allotted size cannot be sent.

**Scenarios**

I want to tell my audience about a special event in their area.
I want to schedule my message to be sent next Monday at 9:00 AM.
I only want to send my message to iOS device users.
Goals

An interface for creating, editing, and scheduling messages.
