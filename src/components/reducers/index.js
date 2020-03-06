const initialState = {
  is_edit: false,
  item_id: 0
};

export const editReducer = (state = initialState, action) => {
  console.log("3. reducers/index.js", state, action);

  switch (action.type) {
    case "UPDATE_TASK_NAME":
      console.log(`3a. "UPDATE_TASK_NAME"`, {
        is_edit: !state.is_edit,
        item_id: action.currentId
      });

      return {
        is_edit: !state.is_edit,
        item_id: action.currentId
      };
    // GOTCHA: must have default state or else there's no state at all "null"
    default:
      return state;
  }
};
