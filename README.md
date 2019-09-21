# Journey Planner
FAC Week 2 project by Martha and Thomas.

Take a look at:
https://facxbeamery.github.io/project-2-thomas-martha/

<img src="Screenshot 2019-09-20 at 15.44.29.png">

## User Journey
As a user, I want to be able to see the best route (based on my preferences and requirements) between two postcodes so I can accurately plan my journey and save time.
### User Stories
* As a user I want to enter my postcodes and know they are valid so I can correct a mistake.
* As a user I want to choose my journey preferences so I can check accessible routes, or ones with less walking.
* As a user I want to see live journey times so that I can change my route accordingly.
* As a user I want to see my route displayed and the duration of my journey so I can know how long I will travel for.
* As a user I want to see an error when the server returns one so I can understand why my input is not working.


## Bugs, Improvements and Stretch Goals
* [IMPROV]: Reasons for delay could be displayed when tubes have issues, e.g. The Circle line is part suspended between A and .
* [IMPROV]: Could change so time could be added to allow future planning.
* [IMPROV]: Could include other location identifiers other than postcodes.
* [IMPROV]: Keeping the API key private and importing it into script.js from a separate file.
* [STR GOAL]: Be able to run the webpage from a local HTTP server, from a Docker container.
* [BUG]: When there are multiple line statuses, currently, they create a new table column. As opposed to creating a new table column, they should be appended to the existing status column.
