export const formatDate = (normalDate) => {
  const formatter = new Intl.NumberFormat("ru", { minimumIntegerDigits: 2 });
  return normalDate
    ? `${normalDate.getFullYear()}-${formatter.format(
        normalDate.getMonth() + 1
      )}-${formatter.format(normalDate.getDate())}T${formatter.format(
        normalDate.getHours()
      )}:${formatter.format(normalDate.getMinutes())}`
    : "";
};

export const getAllFromTableClient = async (table) => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/${table}`,
    {
      method: "GET",
      headers: { "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b" },
    }
  );
  const json = await response.json();
  return json;
};

export const getFromTableByIdClient = async (table, id) => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/${table}/${id}`,
    {
      method: "GET",
      headers: { "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b" },
    }
  );
  const json = await response.json();
  return json;
};

export const postToTableClient = async (table, data) => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/${table}`,
    {
      method: "POST",
      headers: {
        "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const json = await response.json();
  return json;
};

export const putToTableClient = async (table, id, data) => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/${table}/${id}`,
    {
      method: "PUT",
      headers: {
        "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const json = await response.json();
  return json;
};
