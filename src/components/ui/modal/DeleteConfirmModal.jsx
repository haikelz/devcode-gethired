import { Button } from "../Button";

export function DeleteConfirmModal() {
  return (
    <div className="fixed bg-white w-full flex justify-center items-center min-h-screen">
      <div>
        <p>Apakah anda yakin menghapus</p>
        <div>
          <Button className="bg-secondary" label="batal">
            Batal
          </Button>
          <Button className="bg-danger" label="delete">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
