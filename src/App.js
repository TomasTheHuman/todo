import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items:[],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key:Date.now()
      }
    })
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !== ""){
      const newItems = [...this.state.items, newItem];
      this.setState({
        items:newItems,
        currentItem:{
          text:'',
          key:''
        }
      })
    }
  }

  deleteItem(key){
    const filteredItems = this.state.items.filter(item => 
      item.key !== key);
      this.setState({
        items:filteredItems
      })
  }

  render(){
    return(
    <div>
    <header>
      <form id="todoform" onSubmit={this.addItem}>
        <input type="text" placeholder = "Введите текст"
        value = {this.state.currentItem.text}
        onChange={this.handleInput}/>
        <button type="submit">Add</button>
      </form>
    </header>
    <ListItems items = {this.state.items}
    deleteItem = {this.deleteItem}
    ></ListItems>
    </div>
    );
  }
}

function ListItems(props){
  const items = props.items;
  const listItems = items.map(item =>{
      return <div className="list" key={item.key}>
          <p>{item.text}
          <button id="butt" onClick={ () => props.deleteItem(item.key) }>Del</button>
          </p>
          
      </div>
  });
  return(
      <div>{listItems}</div>
  )
}

export default App;
