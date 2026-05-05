"use strict";

export const multiply = (a, b) => a * b;

export const sumAll = (...nums) => {
    return nums.reduce((acc, num) => acc + num, 0);
};