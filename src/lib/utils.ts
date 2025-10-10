import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as USD currency
 * @param value - The number to format
 * @returns Formatted string like "$1,234.56"
 */
export function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

/**
 * Formats a number as Guaraníes currency
 * @param value - The number to format
 * @returns Formatted string like "Gs 1.234.567"
 */
export function formatGuaranies(value: number): string {
  return `Gs ${new Intl.NumberFormat('es-PY', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)}`
}
