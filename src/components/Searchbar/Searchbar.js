import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { useState } from "react";
import { Header, Form, Button, Input, SearchIcon } from './Searchbar.styled';
// import {toast} from 'react-hot-toast';


export const Searchbar = ({onSubmit}) => {
  const [searchName, setSearchName] = useState('');

  const handleChange = event => {
    setSearchName(event.target.value)
  };

  const handleSubmit = event => {
      event.preventDefault();

    if(!searchName.trim()) {
      toast.error('The field should not be empty, please enter a name');
      return;
    }

    onSubmit(searchName)
    setSearchName('')
  }

    return (
      <Header>
    <Form onSubmit={handleSubmit}>
      <Button type="submit">
        <span><SearchIcon /></span>
      </Button>

      <Input
        type="text"
        name="search"
        value={searchName}
        onChange={handleChange}
        autocomplete="off"
        placeholder="Search images and photos"
      />
    </Form>
    </Header>
     )
  }



Searchbar.protoTypes = {
  onSubmit: PropTypes.func.isRequired,
};
