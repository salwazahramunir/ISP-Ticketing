"use server";
export const getAllData = async (path: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/${path}`);

    if (!response.ok) {
      throw `Fetch failed: ${response.status} ${response.statusText}`;
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getDataById = async (id: string, path: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/${path}/${id}`);

    if (!response.ok) {
      throw `Fetch failed: ${response.status} ${response.statusText}`;
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteDataById = async (id: string, path: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/${path}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw `Fetch failed: ${response.status} ${response.statusText}`;
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateDataById = async (input: any, path: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw `Fetch failed: ${response.status} ${response.statusText}`;
    }

    let data = await response.json();

    return data;
  } catch (error) {
    console.log("HAIII");

    console.log(error);
  }
};
