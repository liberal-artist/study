import { useState } from 'react';
import './App.css';

function Header(props) {
  return (
    <header>
      <h1><a href='/' onClick={(event) => {
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  );
}

function Nav(props) {
  return (
    <nav>
      <ol>
        {props.topics.map((topic) => {
          return <li key={topic.id}>
              <a id={topic.id} href={'/read/'+topic.id} onClick={(event) => {
                event.preventDefault();
                props.onChangeMode(Number(event.target.id));
              }}>{topic.title}</a>
            </li>;
        })}
      </ol>
    </nav>
  );
}

function Article(props) {
  return (
  <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p>
          <input type='text' name='title' placeholder='title'></input>
        </p>
        <p>
          <textarea name='body' placeholder='body'></textarea>
        </p>
        <p>
          <input type='submit' value='Create'></input>
        </p>
      </form>
    </article>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Edit</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        props.onUpdate(title, body);
      }}>
        <p>
          <input type='text' name='title' value={title} 
            onChange={(event) => setTitle(event.target.value)}></input>
        </p>
        <p>
          <textarea name='body' value={body} 
            onChange={(event) => setBody(event.target.value)}></textarea>
        </p>
        <p>
          <input type='submit' value='Update'></input>
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]);
  const [nextId, setNextId] = useState(4);

  let content = null;
  let contextControl = null;

  if (mode === 'WELCOME') {
    content = <Article title='Welcome' body='Hello, Web!'></Article>;
  } else if (mode === 'READ') {
    for (let i = 0; i < topics.length; i++) {
      const _id = topics[i].id;
      const _title = topics[i].title;
      const _body = topics[i].body;
      if (_id === id) {
        content = <Article title={_title} body={_body}></Article>;
        break;
      }
    }
    contextControl = (
      <>
        <li>
          <a href={'/update/'+id} onClick={(_event) => {
            _event.preventDefault();
            setMode('UPDATE');
          }}>Edit</a>
        </li>
        <li>
          <input type='button' value={'Delete'} onClick={(_event) => {
            const newTopics = [];
            for (let i = 0; i < topics.length; i++) {
              const _id = topics[i].id;
              if (_id !== id) {
                newTopics.push(topics[i]);
              }
            }
            setTopics(newTopics);
            setMode('WELCOME');
          }}></input>
        </li>
      </>
    );
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = {id: nextId, title: _title, body: _body};
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>;
  } else if (mode === 'UPDATE') {
    for (let i = 0; i < topics.length; i++) {
      const _id = topics[i].id;
      const _title = topics[i].title;
      const _body = topics[i].body;
      if (_id === id) {
        content = <Update title={_title} body={_body} onUpdate={(__title, __body) => {
          const updatedTopic = {id:_id, title:__title, body:__body};
          const newTopics = [...topics];
          newTopics[i] = updatedTopic;
          setTopics(newTopics);
          setMode('READ');
        }}></Update>;
        break;
      }
    }
  }

  return (
    <div className="App">
      <Header title='REACT' onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <a href='/create' onClick={(_event) => {
        _event.preventDefault();
        setMode('CREATE');
      }}>Create New Topic</a>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <br></br>
      {contextControl}
    </div>
  );
}

export default App;
