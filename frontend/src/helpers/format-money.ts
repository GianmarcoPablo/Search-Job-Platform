
// Format money to display in the UI to Soles (PEN) currency
export const formatMoney = (amount: number) => {
    const formatter = new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 2
    })

    return formatter.format(amount)
}