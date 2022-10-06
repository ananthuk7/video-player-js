export const eventPlayed = (el, event, action) => {
  el.addEventListener(event, action);
};
export const removeEventPlayed = (el, event, action) => {
    el.removeEventListener(event, action);
  };
