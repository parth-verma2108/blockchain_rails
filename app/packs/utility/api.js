import axios from "axios";

const generateHeader = () => {
  const csrf = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

  const header = {
    "X-CSRF-Token": csrf,
  };

  return header;
};

export function GET(url, params) {
  return axios({
    method: "GET",
    headers: generateHeader(),
    url,
    params,
  });
}

export function POST(url, data) {
  return axios({
    method: "POST",
    headers: generateHeader(),
    url,
    data,
  });
}

export function PATCH(url, data) {
  return axios({
    method: "PATCH",
    headers: generateHeader(),
    url,
    data,
  });
}

export function DELETE(url, data) {
  return axios({
    method: "DELETE",
    headers: generateHeader(),
    url,
    data,
  });
}
