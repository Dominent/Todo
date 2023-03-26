# The Challenge:

Build a ToDo List App where you can add, edit and remove list items. You should be able to change the state of the items in the list e.g. set it from `IN_PROGRESS` to `COMPLETE`. Also you need to be able to change the name of it or remove the item entirely.

List items should be persisted in state (please use `ngrx` for this). 

## Demo

You can find a demo of working example below:
[Example Demo](https://todo-list-redux-nextjs-swart.vercel.app/)

## Data Structure

A `ListItem` looks like below:

```
{
  "id": "1"
  "name": "My first item",
  "status": "COMPLETE",
}
```

## Your tasks

1. So far only listing all items is working. Please also add the feature that you can filter for items that are in progress or complete on the other tabs.
2. The functions for adding list items, changing status or removing are missing in the state/store. Please add them.
3. Refactor the list component into a reusable component across All, In Progress and Completed todos
4. So far you aren't able to change the name of a todo item. Please implement the feature that this is possible.


## Tech Stack Requirements

Please use the following libraries. Some are already installed:

- Ngrx for state management (installed)
- UI Library of your choice

## Resources
- You can use a UI library like Material UI [Link](https://v14.material.angular.io/guide/getting-started)

## Evaluation Criteria

- Completeness of deliverables
- The way how you built the components
- How production ready the solution is

## Solution

- Architecture
- Logic is structured in modules. Module reflects a specific part of the business domain. Module should be highly cohesive and there should be low coupling with other modules. The logic in module is comprised of several parts:
    - **store**: Contains the state for the module and all the logic for the BE requests
    - **components**: Contains the components used in the module
    - **models**: Contains the entities that the module refers to
    - **stubs**: Contains the stubs/mocks used in unit tests
    - **services**: Contains the services which are responsible for making the BE calls.

- Features
    - Filter Todos by state: All, In Progress, Completed
    - Toggle Todo status: In Progress, Completed
    - Edit Todo name.
    - Delete Todo.
    - Add Todo.

- Unit Testing
    - Code coverage around ~65%
    - Tested mostly the store features ad being the most challenging
    - Used jasmine-marbles to ease up the testing of observables. The library provides functionality to express an observable in terms of its marble diagram.

- Styling
    - Basic, used mainly material ui styles.
