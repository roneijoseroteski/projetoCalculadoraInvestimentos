import { generateReturnsArray } from "./investimentGoals.js";

const form = document.getElementById("investment-form");

const calculateButton = document.getElementById("calculate-button");

function renderProgression(evt) {
  evt.preventDefault();

  // const startingAmount = Number(form["starting-amount"].value);
  // const additionalContribution = Number(form["additional-contribution"].value);
  // const timeAmount = Number(form["time-amount"].value);
  // const returnRate = Number(form["return-rate"].value);
  // const taxRate = Number(form["tax-rate"].value);

  const startingAmount = Number(
    document.getElementById("starting-amount").value,
  );

  const additionalContribution = Number(
    document.getElementById("additional-contribution").value,
  );

  const timeAmount = Number(document.getElementById("time-amount").value);

  const timeAmountPeriod = document.getElementById("time-amount-period").value;

  const returnRate = Number(document.getElementById("return-rate").value);

  const returnRatePeriod = document.getElementById("evaluation-period").value;

  const taxRate = Number(document.getElementById("tax-rate").value);

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
form.addEventListener("submit", renderProgression);

// calculateButton.addEventListener("click", renderProgression);
