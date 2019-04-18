// Set url path for API here:
const urlPath="http://localhost:5002/"
export default {

  getAllItems: (items, userId) => {
    const fetchString =(userId?`?userId=${userId}`:"")
    return fetch(`${urlPath}${items}${fetchString}`)
      .then(r => r.json())
  },
  getAdmins: ()=>{
    return fetch(`${urlPath}users/?isAdmin=true`)
    .then(r => r.json())
  },
  getSingleItem: (items, id) => {

    return fetch(`${urlPath}${items}/${id}`)
      .then(r => r.json())
  },
  deleteItem: (items, id) => {

    return fetch(`${urlPath}${items}/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
  },
  addNewItem(items, newItem) {
    return fetch(`${urlPath}${items}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    }).then(data => data.json())
  },
  editItem(items, editedItem) {
    return fetch(`${urlPath}${items}/${editedItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedItem)
    }).then(data => data.json());
  },
  patchItem(items, id, patchItem) {
    return fetch(`${urlPath}${items}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patchItem)
    }).then(data => data.json());
  }
}

