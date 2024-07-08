
<div>
    <h1 id="readme-top">AutoComplete Component</h1>
    <p>This is an example of an autocomplete component built in React, equipped with essential core functionalities: </p>

* <b>Dynamic Suggestions :</b> As users type, the component dynamically suggests possible matches from a predefined list.
* <b>Keyboard Navigation :</b> Users can navigate through suggestions using the arrow keys and select items with the Enter key.
* <b>Highlighted Text :</b> The component highlights the matching text in the suggestions.
* <b>Debounced Input :</b> The component debounces the input to prevent unnecessary API calls.
* <b>Customization :</b> The appearance and behavior of the suggestions can be easily customized through props.
</div>

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)

## Installation
<p align="right">(<a href="#readme-top">back to top</a>)</p>

1. Clone the repository
```bash
git clone 
```

2. Install dependencies
```bash
yarn install
```

3. Start the development server
```bash
yarn run dev
```

## Usage
 <p>Here is an example of how to use the AutoComplete component:</p>

```javascript
<AutoComplete<Employee>
    dataSource={employees}
    displayExpr='fullName'
    placeholder='Search employees by name...'
    onSelect={(employee) => console.log(employee)}
    label='Employee Name'
    keyExpr='id'
    clearButton
/>
```
- datasource: Array of objects to search from <br>
- displayExpr: The property of the object to display in the suggestions <br>
- placeholder: Placeholder text for the input <br>
- onSelect: Callback function to handle the selection of an item <br>
- label: Label for the input <br>
- keyExpr: The property of the object to use as a key <br>
- clearButton: Boolean to show a clear button in the input <br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
