import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const submitContactThroughNetlify = (event: SubmitEvent) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || form.getAttribute("name") !== "contact" || form.hidden) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  form.action = "/merci.html";
  HTMLFormElement.prototype.submit.call(form);
};

window.addEventListener("submit", submitContactThroughNetlify, true);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>,
);
