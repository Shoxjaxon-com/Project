let baseUrl = import.meta.env.VITE_BASE_URL;
console.log(baseUrl);

export async function getInvoices(route = "/invoices", query = "") {
  let req = await fetch(baseUrl + route + (query ? `?status=${query}` : ""));
  if (req.status === 200) {
    let result = await req.json();
    return result.data;
  } else {
    return new Error("Nimadur hato keti");
  }
}

export async function getInvoice(route = '/invoices', id) {
  let req = await fetch(baseUrl + route + `/${id}`);
  
  if (req.status === 200) {
    let result = await req.json();
    console.log(result);
    
    return result;
  } else {
    return new Error("Nimadur hato keti");
  }
}

export async function deleteById(id) {
  let req = await fetch(baseUrl + `/invoices/` + `${id}`, {
    method: "DELETE",
  });
  if (req.status === 200) {
    return "seccess";
  } else {
    return new Error("Nimadur hato keti");
  }
}

export async function updateById(id, newData) {
  let req = await fetch(baseUrl + `/invoices/` + `${id}`, {
    method: "PATCH",
    body: JSON.stringify(newData),
  });
  if (req.status === 200) {
    let result = await req.json();
    return result;
  } else {
    return new Error("Nimadur hato keti");
  }
}

export async function addInvoice(data) {
  let req = await fetch(baseUrl + "/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (req.status === 200) {
    let result = await req.json();
    return result;
  } else {
    return new Error("Nimadur hato keti");
  }
}
