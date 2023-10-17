import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { getPodcasts } from '../../domain/services/podcast';
import {useRequest} from "../hooks/request";

function Home() {
  const [filter, setFilter] = useState<string|null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  const { setRequest } = useRequest();

  useEffect(() => {
    setRequest({ loading: true });
    getPodcasts()
      .then((response) => {
        console.log(response);
        setItems(response);
      })
      .finally(() => {
        setRequest({ loading: false });
      })
  }, []);

  useEffect(() => {
    if (!filter) {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(({ title, 'im:name': name }) => title.label.toLowerCase().includes(filter.toLowerCase()) || name.label.toLowerCase().includes(filter.toLowerCase())));
    }
  }, [items, filter]);

  return (
    <div>
      <div id="filter">Filter <input type="text" onChange={(e) => setFilter(e.currentTarget.value)}/></div>
      <div id="content">
        {filteredItems.map((item) => (<li key={item.id.attributes['im:id']}><NavLink to={`/podcast/${item.id.attributes['im:id']}`}>{item.title.label}</NavLink></li>))}
      </div>
    </div>
  )
}

export default Home;