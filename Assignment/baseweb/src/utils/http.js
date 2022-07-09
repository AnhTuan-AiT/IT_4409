import { baseURL } from "../../app.js";

export const URLSearchParams2JSON = (req) => {
  const currentUrl = new URL(req.url, baseURL);
  const searchParams = currentUrl.searchParams;

  return Object.fromEntries([...searchParams]);
};

export const RequestBody2JSON = (req, func) => {
  let data = [];

  req.on("data", (chunk) => {
    data.push(chunk);
  });

  req.on("end", () => {
    const body = JSON.parse(data);
    func(body);
  });
};
