function fetchData(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => processData(data))
      .catch(error => console.error(error));
  }
  
  function processData(data) {
    const items = [];
    for (const item of data) {
      const name = item.name;
      const description = item.description;
      const formattedItem = {
        name: name,
        description: description
      };
      items.push(formattedItem);
    }
    return items;
  }
  
  const url = "https://api.rinzdev.com/trashapidelta/listapimotherfucker";
  fetchData(url)
    .then(items => {
      console.log("Fetched items:", items);
    });
  