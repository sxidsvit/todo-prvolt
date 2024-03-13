// Local Storage operating functions

export const getLocalStorage = () => {
  return {
    records: JSON.parse(localStorage.getItem("records")),
    filtering: JSON.parse(localStorage.getItem("filtering")),
  }
};

export const setLocalStorage = (records, filtering) => {
  localStorage.setItem("records", JSON.stringify(records));
  localStorage.setItem("filtering", JSON.stringify(filtering));
};
