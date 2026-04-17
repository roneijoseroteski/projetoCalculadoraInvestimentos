import { generateReturnsArray } from "./investimentGoals.js";

import { Chart } from "chart.js/auto";

const form = document.getElementById("investment-form");
const clearFormButton = document.getElementById("clear-form");
const finalMoneyChart = document.getElementById("final-money-distribution");
const progressionChart = document.getElementById("progression");
// const calculateButton = document.getElementById("calculate-button");

let doughnutChartReference = {};
let progressionChartReference = {};

// function formatCurrency(value) {
//   return value.toLocaleString("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   });
// }

function formatCurrency(value) {
  return value.toFixed(2);
}

function renderProgression(evt) {
  evt.preventDefault();

  resetCharts();

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

  const finalInvestmentObject = returnsArray[returnsArray.length - 1];

  doughnutChartReference = new Chart(finalMoneyChart, {
    type: "doughnut",
    data: {
      labels: ["Total investido", "Rendimento", "Imposto"],
      datasets: [
        {
          data: [
            formatCurrency(finalInvestmentObject.investedAmount),
            formatCurrency(
              finalInvestmentObject.totalInterestReturns * (1 - taxRate / 100),
            ),
            formatCurrency(
              finalInvestmentObject.totalInterestReturns * (taxRate / 100),
            ),
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  progressionChartReference = new Chart(progressionChart, {
    type: "bar",
    data: {
      labels: returnsArray.map((investmentObject) => investmentObject.month),
      datasets: [
        {
          label: "Total Investido",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.investedAmount),
          ),

          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "Retorno do Investimento",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.interestReturns),
          ),
          backgroundColor: "rgb(54, 162, 235)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    },
  });
}

function isObejctEmpty(obj) {
  return Object.keys(obj).length === 0; // retorna true se o objeto estiver vazio, ou seja, não tiver nenhuma chave
}

function resetCharts() {
  if (
    !isObejctEmpty(doughnutChartReference) &&
    !isObejctEmpty(progressionChartReference)
  ) {
    doughnutChartReference.destroy();
    progressionChartReference.destroy();
  }
}

function clearForm() {
  form["starting-amount"].value = "";
  form["additional-contribution"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";

  resetCharts();

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
  if (evt.target.value === "") {
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
