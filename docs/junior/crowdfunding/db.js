const moneyElmt = document.getElementById('money');
const moneyGoalElmt = document.getElementById('money-goal');
const totalBackersElmt = document.getElementById('total-backers');
const daysLeftElmt = document.getElementById('days-left');
const barElmt = document.getElementById('progress-bar');
const bambooLeftElmt = document.getElementById('bamboo-left');
const bambooCostElmt = document.getElementById('bamboo-cost');
const blackLeftElmt = document.getElementById('black-left');
const blackCostElmt = document.getElementById('black-cost');
const mahoganyLeftElmt = document.getElementById('mahogany-left');
const mahoganyCostElmt = document.getElementById('mahogany-cost');
export const defaultValType = Object.freeze({ MONEY: 0, NUMBER: 1, OTHER: 2 });
export const defaultValues = {
  money_raised:       { value: 75560, type: defaultValType.MONEY, element: moneyElmt },
  money_goal:         { value: 100000, type: defaultValType.MONEY, element: moneyGoalElmt },
  total_backers:      { value: 5007, type: defaultValType.NUMBER, element: totalBackersElmt },
  days_left:          { value: 56, type: defaultValType.NUMBER, element: daysLeftElmt },
  item_bamboo_left:   { value: 101, type: defaultValType.NUMBER, element: bambooLeftElmt },
  bamboo_cost:        { value: 25, type: defaultValType.MONEY, element: bambooCostElmt },
  item_black_left:    { value: 3, type: defaultValType.NUMBER, element: blackLeftElmt },
  black_cost:         { value: 75, type: defaultValType.MONEY, element: blackCostElmt },
  item_mahogany_left: { value: 1, type: defaultValType.NUMBER, element: mahoganyLeftElmt },
  mahogany_cost:      { value: 200, type: defaultValType.MONEY, element: mahoganyCostElmt },
  get progress_bar() {
    return { value: (this.money_raised.value / this.money_goal.value) * 100, type: defaultValType.OTHER, element: barElmt }
  }
};
