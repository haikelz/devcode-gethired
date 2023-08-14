export function SortAccordion() {
  const sortData = [
    {
      id: 1,
      name: "Terbaru",
      icon: "",
    },
    {
      id: 2,
      name: "Terlama",
      icon: "",
    },
    {
      id: 3,
      name: "A-Z",
      icon: "",
    },
    {
      id: 4,
      name: "Z-A",
      icon: "",
    },
    {
      id: 5,
      name: "Belum Selesai",
      icon: "",
    },
  ];

  /**
   * Logic buat accordion
   *
   * - Set initial state value ke false dulu
   * - Jika suatu pilihan diklik/dipilih, maka jadikan statenya true, ditandai dengan munculnya tanda centang
   * - Jika tidak, maka kembalikan ke false
   */
  return (
    <div className="bg-white shadow-lg rounded-lg">
      <ul>
        {sortData.map((value) => (
          <li key={value.id} className="flex justify-between">
            <div>
              {/**Each icon */}
              <span>{value.name}</span>
            </div>
            {/** Ikon centang */}
          </li>
        ))}
      </ul>
    </div>
  );
}
