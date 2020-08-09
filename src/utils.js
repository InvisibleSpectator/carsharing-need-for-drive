export const YANDEX_API_KEY = "1254b552-75fa-48c4-88c3-5df1350fbe3e";

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

export const getGeoData = async (key, address) => {
  const response = await fetch(
    `https://geocode-maps.yandex.ru/1.x?apikey=${key}&geocode=${address}&format=json`
  );
  const json = await response.json();
  return json.response;
};
