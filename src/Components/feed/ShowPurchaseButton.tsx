type Props = {
    showPurchases: boolean,
    toggleShowPurchases: () => void
}

export function ShowPurchaseButton({showPurchases, toggleShowPurchases}: Props) {
    return <button
        onClick={() => toggleShowPurchases()}
        className={`px-3 py-1 border transition-colors ${
            showPurchases ? "border-red-500 bg-red-500/20 text-red-400" : "border-gray-600 bg-gray-800 text-gray-400"
        }`}
    >
        💰 ACHATS
    </button>;
}
