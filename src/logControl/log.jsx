import LogItem from './logItem';

function Log(props) {
  //   console.log('log props :', props);
  return (
    <div>
      <ul>
        {props.contentList.length !== 0 &&
          props.contentList.map((item, i) => {
            return (
              <LogItem
                key={item.id}
                item={item}
                itemChange={props.itemChange}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default Log;
