import { atom, useAtom } from "jotai";

/**
 * 1. button simpan
 * 2. input nama list
 * 3. select priority
 */
// const listItemAtom = atom([{ id: "", item: "" }]);
// priority
const inputListItemAtom = atom("");

export function InactiveItemModal() {
  const [] = "";

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="rounded-md shadow-lg">
      <div className="flex justify-between items-center">
        <span className="font-bold">Tambah List Item</span>
        <button type="button" aria-label="add item list">
          {/**X Icon */}
          <img src="/close.svg" alt="close" loading="lazy" />
        </button>
      </div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="addlist">Nama List Item</label>
              <input
                type="text"
                name="addlist"
                placeholder="Tambahkan List Item...."
                className="border-2 border-gray-200 rounded-md px-3 py-1.5"
              />
            </div>
            <div className="">
              <label htmlFor="priority">Priority</label>
              <select name="" id=""></select>
            </div>
          </form>
        </div>
      </div>
      <div>
        <button
          className="bg-[#16ABF8] rounded-full px-5 py-2 opacity-20"
          type="button"
          aria-label="simpan"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
