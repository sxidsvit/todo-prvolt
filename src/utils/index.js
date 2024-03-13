// Local Storage operating functions

export const getLocalStorage = () => {
  return {
    records: JSON.parse(localStorage.getItem("records")),
    filtering: JSON.parse(localStorage.getItem("filtering")),
    editing: JSON.parse(localStorage.getItem("editing")),
  }
};

export const setLocalStorage = (records, filtering, editing) => {
  localStorage.setItem("records", JSON.stringify(records));
  localStorage.setItem("filtering", JSON.stringify(filtering));
  localStorage.setItem("editing", JSON.stringify(editing));
};
