import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://todo.api.devcode.gethired.id",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export async function getData(path) {
  const response = await axios.get(path);
  return response.data;
}

export async function postData(path, config) {
  await axios.post(path, config);
}

export async function patchData(path, config) {
  await axios.patch(path, config);
}

export async function deleteData(path) {
  await axios.delete(path);
}
