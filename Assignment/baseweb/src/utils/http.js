export const URLSearchParams2JSON = (searchParams) => {
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
