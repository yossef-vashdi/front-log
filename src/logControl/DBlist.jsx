import { useState } from 'react';

function DBlist(props) {
  const [open, setOpen] = useState(false);

  const addDB = (e) => {
    e.preventDefault();
    const nameValue = e.target.dbName.value.trim();
    if (!nameValue) return setOpen(false);
    props.changeDB('postDB', nameValue);
    e.target.dbName.value = '';
    setOpen(false);
  };
  return (
    <div className="db-list">
      <select
        name="selectDB"
        id="selectDB"
        onChange={(e) => props.changeDB('getContent', e.target.value)}
      >
        {props.dbList.length !== 0 &&
          props.dbList.map((item) => (
            <option key={item} value={item.slice(0, -5)}>
              {item.slice(0, -5)}
            </option>
          ))}
      </select>

      {open ? (
        <form onSubmit={addDB}>
          <label htmlFor="dbName">add DB, name : </label>
          <input type="text" id="dbName" />
          <button type="submit"> add </button>
        </form>
      ) : (
        <button className="button" onClick={() => setOpen(true)}>
          open
        </button>
      )}
    </div>
  );
}

export default DBlist;
