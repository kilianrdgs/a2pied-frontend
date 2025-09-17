type Props = {
  toggleShowDeaths: () => void;
  showDeaths: boolean;
};

export function ShowDeathsButton({ toggleShowDeaths, showDeaths }: Props) {
  return (
    <button
      onClick={() => toggleShowDeaths()}
      style={{ borderRadius: 8 }}
      className={`px-3 py-1 border transition-colors ${
        showDeaths
          ? "border-red-500 bg-red-500/20 text-red-400"
          : "border-gray-600 bg-gray-800 text-gray-400"
      }`}
    >
      💀 MORTS
    </button>
  );
}
