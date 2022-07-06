import { useEffect, useRef } from 'react';
import { useState } from 'react';
import server from './server';
import DBlist from './DBlist';
import Log from './log';
import Form from './form';
import './CSS/log.css';

function LogControl() {
  const [contentList, setContentList] = useState([]);
  const [dbList, setdbList] = useState([]);
  const [currentDB, setCurrentDB] = useState('');
  const [editContent, setEditContent] = useState();
  const formRef = useRef(null);

  //   const initialization = async (data) => {
  //     if (data.length !== 0 && contentList.length === 0) {
  //       dataServer('getContent', data[0].slice(0, -5));
  //       setCurrentDB(data[0].slice(0, -5));
  //     }
  //   };

  const initialization = async () => {
    const dbData = await server('getDB');
    setdbList(dbData);
    setCurrentDB(dbData[0].slice(0, -5));
    const contentData = await server(
      'getContent',
      dbData[0].slice(0, -5)
    );
    setContentList(contentData);
  };
  const itemChange = (func, db, post) => {
    // console.log('index component', func, db, post);
    if (func === 'deleteContent') dataServer(func, db, post);
    if (func === 'putContent') {
      setEditContent(post);
      formRef.current.scrollIntoView();
    }
  };

  const dataServer = async (func, db, post) => {
    // console.log('func, db,post', func, db, post);
    const data = await server(func, db, post);
    if (func.includes('DB')) {
      setdbList(data);
    } else setContentList(data);
  };

  const changeDB = (func, dbName) => {
    setCurrentDB(dbName);
    dataServer(func, dbName);
  };

  useEffect(() => {
    // dataServer('getDB');
    initialization();
  }, []);
  return (
    <div>
      <hr ref={formRef} />
      <Form
        submitContent={dataServer}
        db={currentDB}
        edit={editContent}
      />
      <hr />
      <DBlist changeDB={changeDB} dbList={dbList} />
      <hr />
      <div>
        currently there is <b>{contentList.length}</b> Posts in this
        list
      </div>
      <hr />
      <Log
        contentList={contentList}
        dbList={dbList}
        itemChange={itemChange}
      />
    </div>
  );
}

export default LogControl;
