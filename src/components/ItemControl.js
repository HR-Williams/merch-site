import React from 'react';
import NewItemForm from './NewItemForm';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import EditItemForm from './EditItemForm'

class ItemControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterItemList: [],
      selectedItem: null,
      editing: false
    };
  }

  handleAddingNewItemToList = (newItem) => {
    const newMasterItemList = this.state.masterItemList.concat(newItem);
    this.setState({
      masterItemList: newMasterItemList,
      formVisibleOnPage: false
    })
  }

  handleChangingSelectedItem = (id) => {
    const selectedItem = this.state.masterItemList.filter(item => item.id === id)[0];
    this.setState({ selectedItem: selectedItem })
  }

  handleClick = () => {
    if (this.state.selectedItem != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedItem: null,
        editing: false
      })
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  handleDeletingItem = (id) => {
    const newMasterItemList = this.state.masterItemList.filter(item => item.id !== id);
    this.setState({
      masterItemList: newMasterItemList,
      selectedItem: null
    });
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingItemInList = (itemToEdit) => {
    const editedMasterItemList = this.state.masterItemList
    .filter(item => item.id !== this.state.selectedItem.id)
    .concat(itemToEdit);
    this.setState({
      masterItemList: editedMasterItemList,
      editing: false,
      selectedItem: null
    })
  }

  handleBuyingItemInList = (itemToBuy) => {
    const boughtMasterItemList = this.state.masterItemList
    .filter(item => item.id !==this.state.selectedItem.id)
    .concat(itemToBuy);
    this.setState({
      masterItemList: boughtMasterItemList,
      editing: false
    });
  }

  

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = <EditItemForm item = {this.state.selectedItem} onEditItem = {this.handleEditingItemInList} />
      buttonText = "Return to inventory";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewItemForm onNewItemCreation={this.handleAddingNewItemToList} />
      buttonText = "Return to inventory";
    } else if (this.state.selectedItem != null) {
      currentlyVisibleState = <ItemDetail item={this.state.selectedItem} onClickingDelete={this.handleDeletingItem} onClickingEdit = {this.handleEditClick} onClickingBuy = {this.handleBuyingItemInList}/>
      buttonText = "Return to inventory";
    } else {
      currentlyVisibleState = <ItemList itemList={this.state.masterItemList} onItemSelection={this.handleChangingSelectedItem} />
      buttonText = "Add new item to inventory"
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>

    )
  }
}

export default ItemControl;
