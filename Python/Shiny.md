# Shiny for Python Ultimate - Web Development with Python 
In Shiny, a web application framework for R, there are various input and output widgets that you can use to build interactive user interfaces. 



## Links
[shiny for python](https://shiny.posit.co/py/)
https://shiny.posit.co/py/api/
## High-Level App Structure
Shiny app include:
1. Static content
2. Input widget/s: Define the behaviour of output widgets
3. Output widget/s

## Visual Studio plugins
Python, Pylance, Shiny For python, flake8

## Project's structure
1. Preparation: import pacjkaes, data preparation
2. Front End: 
+ UI funciton call
+ App look and feel (layout, HTML content, Headers)
+ Define  placeholder for input and output widgets 
3. BackEnd: 
+ Server function call
+ preforms calculations realy on user inputs  

### Layout
sidebar: the inputs widgets are on the left inside a sidebar and the output are on the right (main space)
rows and columns: 
tabs: 
pills: are like tabs but without tabs 
list: a list of widgets top to buttom
cards: like tabs. each tab is attached to a card.
menus: drop down menus 
conditional panetls: panel that is display according to a condition
notisications: notification messages

## New Project
`shiny create .`: Create a small demo project
Running the server: 1. With the play button on VsCode, demande an extention and that the main file will be called app.py 2. `shiny run --reload filename.py` command
**Getting input in the server method:** call input.id() where id is the id you gave to the input
  

# Reactivity 
**@reactive.Value:**
**@reactive.Calc:**
**@output:**


# Widgets
## [Control Widegets](https://shiny.posit.co/py/docs/inputs.html)
### Buttons
- **Radio Buttons:** Provides a set of radio buttons for users to choose from.
- **Action Button:** A button that users can click to trigger an action. 
- **Submit Button:** A button that submits a form when clicked. 

### Check Box
- **Single checkbox:** Creates a checkbox that users can check or uncheck. 
- **Checkbox Group:** Creates a group of checkboxs that users can check or uncheck. 

### Dates
- **Date Input:** Enables users to select a date.
- **Date Range:** Enables users to select a range between two dates.

### File
- **File Input:** Enables users to upload files. `fileInput()`

### User Input
- **Text Input:** Allows users to enter text. 
- **Text Area:** Allows users to enter text with multiple lines. 
- **Numeric Input:** Allows users to enter numeric values. 
- **Password Input:** Allows users to enter a password (masked). `passwordInput()`


### Sliders
- **Slider Input:** Allows users to choose a value by sliding a slider. `input_slider(identifier, title, start point, and point)` 
- **Slider range:** it's the same widget but for the value attribute you pass a list with two numbers that will be the range
- Both have an attribute called animate. If you set it to true you get a play button and the slide bar move by itself.

### Drop Down

- **Select Input:** Generates a drop-down menu for users to select an option. `selectInput()`

### Others
- **Color Input:** Lets users pick a color. `colorInput()`
- **Verbatim Text Output:** Outputs raw HTML or text. `verbatimTextOutput()`
- **Image Output:** Displays images. `imageOutput()`
- **Help Text:** isn't true widget but provides an easy way to add a textto accompigny other widgets.
- 
## Output widgets

1. **Text Output:** Displays text.
    - `textOutput()`

2. **Numeric Output:** Outputs numeric values.
    - `numericOutput()`

3. **Table Output:** Displays a table.
    - `tableOutput()`

4. **Plot Output:** Outputs plots and charts.
    - `plotOutput()`

5. **Image Output:** Displays images.
    - `imageOutput()`

6. **Verbatim Text Output:** Outputs raw HTML or text.
    - `verbatimTextOutput()`

7. **UI Output:** Outputs Shiny UI elements.
    - `uiOutput()`

8. **Audio Output:** Outputs audio files.
    - `audioOutput()`

9. **Download Button:** Provides a button for downloading content.
    - `downloadButton()`
