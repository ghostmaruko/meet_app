## Feature 2: Show/Hide Event Details

# User story
As a user,  
I should be able to show or hide event details  
So that I can choose how much information I want to see.

## Scenario 1: User can expand an event to see its details
Given the list of events has been loaded  
When the user clicks on “Show details” button for an event  
Then the event element will be expanded to show the event details

## Scenario 2: User can collapse an event to hide its details
Given the event element is expanded  
When the user clicks on “Hide details” button  
Then the event element will collapse to hide the event details

---

## Feature 3: Specify Number of Events

# User story
As a user,  
I should be able to specify how many events I want to see  
So that I can control the amount of information displayed on the screen.

## Scenario: User can change the number of events displayed
Given the main page is open  
When the user changes the number of events to be displayed to 10  
Then the user should see 10 events listed on the screen

---

## Feature 4: Use the App When Offline

# User story
As a user,  
I should be able to use the app even when I’m offline  
So that I can view event information without needing an internet connection.

## Scenario: User can view events when offline
Given the user has opened the app and events have been cached  
When the user loses internet connection  
Then the user should still be able to see the list of events from cache

---

## Feature 5: Add App Shortcut to Home Screen

# User story
As a user,  
I should be able to add the app to my home screen  
So that I can access it quickly like a native app.

---

## Feature 6: Display Charts Visualizing Event Details

# User story
As a user,  
I should be able to see charts of event data  
So that I can easily understand trends and distributions in the events.

## Scenario 1: User sees a chart showing the number of events per city
Given the list of events has been loaded  
When the user views the event statistics section  
Then the user should see a chart showing the number of events in each city

## Scenario 2: User sees a chart showing the percentage of events per genre
Given the list of events has been loaded  
When the user views the genre breakdown  
Then the user should see a pie chart with the percentage of events by genre



