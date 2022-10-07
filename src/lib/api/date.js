import { useState } from "react";


export const time = new Date();
export const currentDate = new Date(time - 1000 * 60 * 60 * 6);
export const minusDate = () => {
    currentDate.setDate(currentDate.getDate() - 1);
    
}

export const plusDate = () => {
    currentDate.setDate(currentDate.getDate() + 1);
}