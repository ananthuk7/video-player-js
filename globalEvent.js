/**
 * This function adds an event listener to an element, and when the event is triggered, it runs the
 * action.
 * @param {HtmlElement} el - The element you want to add the event to.
 * @param {Event} event - The event you want to listen for.
 * @callback action - The function to be called when the event is triggered.
 */
export const eventPlayed = (el, event, action) => {
  el.addEventListener(event, action);
};
/**
 * This function removes an event listener from an element.
 * @param {HtmlElement} el - the element you want to add the event to
 * @param {Event} event - The event you want to listen for.
 * @callback action - The function to be called when the event is triggered.
 */
export const removeEventPlayed = (el, event, action) => {
  el.removeEventListener(event, action);
};
