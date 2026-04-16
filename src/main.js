import { generateReturnsArray } from "./investimentGoals.js";

const form = document.getElementById("investment-form");

// const calculateButton = document.getElementById("calculate-button");
const clearFormButton = document.getElementById("clear-form");

function renderProgression(evt) {
  evt.preventDefault();

  // const startingAmount = Number(form["starting-amount"].value);
  // const additionalContribution = Number(form["additional-contribution"].value);
  // const timeAmount = Number(form["time-amount"].value);
  // const returnRate = Number(form["return-rate"].value);
  // const taxRate = Number(form["tax-rate"].value);

  const startingAmount = Number(
    document.getElementById("starting-amount").value.replace(",", "."),
  );

  const additionalContribution = Number(
    document.getElementById("additional-contribution").value.replace(",", "."),
  );

  const timeAmount = Number(document.getElementById("time-amount").value);

  const timeAmountPeriod = document.getElementById("time-amount-period").value;

  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", "."),
  );

  const returnRatePeriod = document.getElementById("evaluation-period").value;

  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", "."),
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod,
  );

  console.log(returnsArray);
}

function clearForm() {
  form["starting-amount"].value = "";
  form["additional-contribution"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";

  const errorInputContainers = document.querySelectorAll(".error");
  // errorInputs.forEach((input) => {
  //   input.classList.remove("error");
  // }); sugestao IA

  for (const errorInputContainer of errorInputContainers) {
    errorInputContainer.classList.remove("error");
    errorInputContainer.parentElement.querySelector("p").remove();
  }
}

function validateInput(evt) {
  if (evt.target.value === " ") {
    return;
  }

  if (document.querySelector(".error")) {
    return;
  }

  // const parentElement = evt.target.parentElement;
  const { parentElement } = evt.target;

  const grandParentElement = evt.target.parentElement.parentElement;

  const inputValue = evt.target.value.replace(",", ".");

  if (
    (!parentElement.classList.contains("error") && isNaN(inputValue)) ||
    Number(inputValue) <= 0
  ) {
    const errorTextElement = document.createElement("p");
    errorTextElement.classList.add("text-red-500");
    errorTextElement.innerText = "Insira um valor númerico e maior que zero";

    parentElement.classList.add("error");
    parentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    // grandParentElement.removeChild(parentElement.querySelector("p")); comando da IA
    grandParentElement.querySelector("p").remove(); // codigo do professor
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}

form.addEventListener("submit", renderProgression);

// calculateButton.addEventListener("click", renderProgression);
clearFormButton.addEventListener("click", clearForm);
