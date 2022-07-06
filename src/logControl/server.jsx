//

const URL = 'http://localhost:5000/logs';

async function server(func, db, post) {
  let data = [];
  switch (func) {
    case 'getDB':
      data = await getDB();
      break;
    case 'postDB':
      data = await postDB(db);
      break;
    case 'getContent':
      data = await getContent(db);
      break;
    case 'postContent':
      data = await postContent(db, post);
      break;
    case 'deleteContent':
      data = await deleteContent(db, post.id);
      console.log('deleting content', db, post.id);
      break;
    case 'putContent':
      data = await putContent(db, post);
      break;
    default:
      console.error(
        'error in server function, did not receive correct values'
      );
  }

  return data;
}

const getDB = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const postDB = async (db) => {
  const response = await fetch(`${URL}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ db: db }),
  });
  const data = await response.json();
  return data;
};

const getContent = async (db) => {
  const response = await fetch(`${URL}/${db}`);
  const data = await response.json();
  return data;
};

const postContent = async (db, post) => {
  const response = await fetch(`${URL}/${db}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  return data;
};

const deleteContent = async (db, id) => {
  const response = await fetch(`${URL}/${db}/${id}`, {
    method: 'delete',
  });
  const data = await response.json();
  return data;
};

const putContent = async (db, post) => {
  const response = await fetch(`${URL}/${db}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  return data;
};

export default server;
