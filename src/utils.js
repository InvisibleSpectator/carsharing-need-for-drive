export const YANDEX_API_KEY = "1254b552-75fa-48c4-88c3-5df1350fbe3e";
const PROXY = "";
const DATABASE_URL = "http://api-factory.simbirsoft1.com/api/db/";
const ADMIN_AUTH_URL = "http://api-factory.simbirsoft1.com/api/auth/";
const APPLICATION_ID = "5e25c641099b810b946c5d5b";
const SECRET_KEY = "4cbcea96de";

export const SEARCH_LIMIT = 20;

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

const getBasicToken = () => {
  let basicToken = "";
  const words =
    "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  const maxPosition = words.length - 1;
  for (let i = 0; i < 7; i += 1) {
    const position = Math.floor(Math.random() * maxPosition);
    basicToken += words.substring(position, position + 1);
  }
  return basicToken;
};

export const getAllFromTableClient = async (table) => {
  const response = await fetch(`${PROXY}${DATABASE_URL}${table}`, {
    method: "GET",
    headers: { "X-Api-Factory-Application-Id": APPLICATION_ID },
  });
  const json = await response.json();
  return json;
};

export const getFromTableByIdClient = async (table, id) => {
  const response = await fetch(`${PROXY}${DATABASE_URL}${table}/${id}`, {
    method: "GET",
    headers: { "X-Api-Factory-Application-Id": APPLICATION_ID },
  });
  const json = await response.json();
  return json;
};

export const postToTableClient = async (table, data) => {
  const response = await fetch(`${PROXY}${DATABASE_URL}${table}`, {
    method: "POST",
    headers: {
      "X-Api-Factory-Application-Id": APPLICATION_ID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};


export const putToTableClient = async (table, id, data) => {
  const response = await fetch(`${PROXY}${DATABASE_URL}${table}/${id}`, {
    method: "PUT",
    headers: {
      "X-Api-Factory-Application-Id": APPLICATION_ID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
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

export const register = async (username, password) => {
  const basicKey = btoa(`${getBasicToken()}:${SECRET_KEY}`);
  const response = await fetch(`${PROXY}${ADMIN_AUTH_URL}register`, {
    method: "POST",
    headers: {
      "X-Api-Factory-Application-Id": APPLICATION_ID,
      "Content-Type": "application/json",
      Authorization: `Basic ${basicKey}`,
    },
    body: JSON.stringify({ username, password }),
  });
  const json = await response.json();
  return json;
};

export const logIn = async (username, password) => {
  const basicKey = btoa(`${getBasicToken()}:${SECRET_KEY}`);
  const response = await fetch(`${PROXY}${ADMIN_AUTH_URL}login`, {
    method: "POST",
    headers: {
      "X-Api-Factory-Application-Id": APPLICATION_ID,
      "Content-Type": "application/json",
      Authorization: `Basic ${basicKey}`,
    },
    body: JSON.stringify({ username, password }),
  });
  const json = await response.json();
  return json;
};

export const getAllFromTableAdmin = async (
  table,
  page = 1,
  filters = "",
  bearer
) => {
  const response = await fetch(
    `${PROXY}${DATABASE_URL}${table}?page=${page}&limit=${SEARCH_LIMIT}${filters}`,
    {
      method: "GET",
      headers: {
        "X-Api-Factory-Application-Id": APPLICATION_ID,
        Authorization: `Bearer ${bearer}`,
      },
    }
  );
  const json = await response.json();
  return json;
};

export const postToTableAdmin = async (table, data, bearer) => {
  const response = await fetch(`${PROXY}${DATABASE_URL}${table}`, {
    method: "POST",
    headers: {
      "X-Api-Factory-Application-Id": APPLICATION_ID,
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer}`,
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

export const putToTableAdmin = async (table, id, data, bearer) => {
  const response = await fetch(`${PROXY}${DATABASE_URL}${table}/${id}`, {
    method: "PUT",
    headers: {
      "X-Api-Factory-Application-Id": APPLICATION_ID,
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer}`,
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

export const deleteFromTableAdmin = async (table, id, data, bearer) => {
  const response = await fetch(`${PROXY}${DATABASE_URL}${table}/${id}`, {
    method: "DELETE",
    headers: {
      "X-Api-Factory-Application-Id": APPLICATION_ID,
      Authorization: `Bearer ${bearer}`,
    },
  });
  const json = await response.json();
  return json;
};

export const getLocal = async (path) => {
  const response = await fetch(`http://localhost:8080/${path}`, {
    method: "GET",
  });
  const json = await response.json();
  return json;
};

export const postToLocal = async (table, data) => {
  const response = await fetch(`http://localhost:8080/${table}`, {
    method: "POST",
    headers: {
      "X-Api-Factory-Application-Id": APPLICATION_ID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};