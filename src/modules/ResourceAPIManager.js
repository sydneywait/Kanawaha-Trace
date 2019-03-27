

export default {

  getAllItems: (items) => {
    return fetch(`http://localhost:5002/${items}`)
      .then(r => r.json())
  },
  getSingleItem: (items, id) => {
    return fetch(`http://localhost:5002/${items}/${id}`)
      .then(r => r.json())
  },
  deleteItem: (items, id) => {
    return fetch(`http://localhost:5002/${items}/${id}`, {
      method: "DELETE"
    })
      .then(() => fetch(`http://localhost:5002/${items}`))
      .then(e => e.json())
  },
  addNewItem(items, newItem) {
    return fetch(`http://localhost:5002/${items}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    }).then(data => data.json())
  },
  editItem(items, editedItem) {
    return fetch(`http://localhost:5002/${items}/${editedItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedItem)
    }).then(data => data.json());
  },
  patchItem(items, id, patchItem) {
    return fetch(`http://localhost:5002/${items}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patchItem)
    }).then(data => data.json());
  }


}

