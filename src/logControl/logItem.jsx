import React from 'react';

function LogItem(props) {
  const { item } = props;
  //   props.itemChange('dont !');

  const confirmMethod = (i) => {
    // props.handleChange({method:"delete", item:props.item})
    if (
      window.confirm('Are you sure you want to Delete this msg ?') ===
      true
    ) {
      // console.log('deleting  :', item);
      props.itemChange('deleteContent', item.db, item);
      console.log('deleted');
    } else {
      console.log('canceled, the note was not deleted');
    }
  };

  return (
    <li>
      <h2>{item.title}</h2>
      <pre>{item.content}</pre>
      <div className="item-buttons">
        <button
          onClick={() =>
            props.itemChange('putContent', item.db, item)
          }
        >
          edit
        </button>
        <button onClick={confirmMethod}>delete</button>
      </div>

      <hr />
    </li>
  );
}

export default LogItem;
